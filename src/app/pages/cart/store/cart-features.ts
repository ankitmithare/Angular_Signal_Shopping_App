import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { cartItem } from "../types/cart-type";
import { cartActions } from "./cart-actions";

export type cartState = {
    items: cartItem[],
    loading: boolean,
    error: string | null
}

export const initialCartState: cartState = {
    items: [],
    loading: false,
    error: null
};

export const cartFeature = createFeature({
    name: 'cart',
    reducer: createReducer(
        initialCartState,
        //Loading cart items
        on(cartActions.load, (state) => ({
            ...state,
            loading: true,  
            error: null
        })),
        on(cartActions.loadSuccess, (state, { items }) => ({
            ...state,
            items,
            loading: false,
            error: null
            
        })),
        on(cartActions.loadFailure, (state, { error }) => ({
            ...state,
            loading: false, 
            error
        })),

        //Adding item to cart
        on(cartActions.addToCart, (state, { product }) => {
           const existingItem = state.items.find((item)=> item.product.id === product.id);
            if(existingItem){
                return{
                    ...state,
                    items: state.items.map((item) =>
                        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
            }
            return {
                ...state,
                items: [...state.items, { product, quantity: 1 }]
            };

        }),

        on(cartActions.removeFromCart, (state, { productId }) => ({
                ...state,
                items: state.items.filter((item) => item.product.id !== productId)
            })
        ),

        on(cartActions.updateQuantity, (state, { productId, quantity }) => ({
            ...state,
            items: quantity > 0 ? state.items.map((item) => 
                item.product.id === productId ? {...item, quantity } : item
            ) : state.items.filter((item) => item.product.id !== productId),
            })

        ),

        on(cartActions.clearCart, (state) => ({
            ...state,
            items: [],
            })
        )

    ),

    extraSelectors: ({ selectItems }) => ({
        selectCartCount: createSelector(selectItems, (items) => 
            items.reduce((total, item)=> total + item.quantity, 0)
        ),

        selectCartTotal: createSelector(selectItems, (items) => 
            items.reduce((total, item)=> total + item.product.price * item.quantity, 0)
        )
    })
});