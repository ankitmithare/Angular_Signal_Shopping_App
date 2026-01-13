import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../products/types/product-type';
import { cartItem } from '../types/cart-type';


export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ items: cartItem[] }>(),
    loadFailure: props<{ error: string }>(),

    addToCart: props<{ product: Product }>(),
    addToCartSuccess: props<{ product: Product }>(),
    addToCartFailure: props<{ error: string }>(),

    removeFromCart: props<{ productId: number }>(),
    updateQuantity: props<{ productId: number; quantity: number }>(),

    clearCart: emptyProps(),
  },
});