import { createFeature, createReducer, on } from "@ngrx/store";
import { Product } from "../types/product-type"
import { ProductAction } from "./product-action";

export type productState ={
    products: Product[];
    filteredProducts: Product[];
    searchQuerry: string | null;
    error: string | null;
    loading: boolean;
    
};
export const initialProductState: productState = {
    products: [],
    filteredProducts: [],
    searchQuerry: null,
    error: null,
    loading: false, 
};
export const productFeature = createFeature({
    name: 'products',
    reducer: createReducer(
        initialProductState,

        on(ProductAction.load, (state) => ({
            ...state,
            loading: true,  
        })),
        on(ProductAction.loadSuccess, (state, { products }) => ({
            ...state,
            products, 
            filteredProducts: products,
            loading: false,
            error: null,
        })),
        on(ProductAction.loadFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        })),
        on (ProductAction.search, (state, { searchQuery }) => {
            const filteredProducts = state.products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return {
                ...state,
                searchQuerry: searchQuery,
                filteredProducts,
            };
            }
        )

    )
});

