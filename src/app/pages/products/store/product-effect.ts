import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductApi } from "../services/product-api";
import { ProductAction } from "./product-action";
import {  catchError, map, of, switchMap } from "rxjs";

export const productEffect = createEffect(
    (
        actions$ = inject(Actions),
        productApi = inject(ProductApi)
    )   => {
        return actions$.pipe(
            ofType(ProductAction.load),
            switchMap(() =>{
                return productApi.getProducts().pipe(
                    map((products)=>ProductAction.loadSuccess({products})),
                    catchError((error) => of(ProductAction.loadFailure({error: error.message})))
                );
            })
        )
    },
    {
        functional: true
    }
)