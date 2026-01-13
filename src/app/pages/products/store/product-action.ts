import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../types/product-type";

export const ProductAction = createActionGroup({
    source: "Product",
    events: {
        load: emptyProps(),  
        loadSuccess: props<{ products: Product[] }>(),
        loadFailure: props<{ error: string }>(),

        search: props<{ searchQuery: string }>(),
    },
});