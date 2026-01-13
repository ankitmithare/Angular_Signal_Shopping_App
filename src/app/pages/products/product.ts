import { Component, inject, OnInit, signal, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductAction } from "./store/product-action";
import { productFeature } from "./store/product-feature";
import { toSignal } from "@angular/core/rxjs-interop";
import { JsonPipe } from "@angular/common";
import { ProductCard } from "../../core/components/product-card";
import { FormsModule } from "@angular/forms";
import { cartActions } from "../cart/store/cart-actions";
import { Product } from "./types/product-type";


@Component({
    selector: "app-products",
    imports: [ProductCard, FormsModule],
    template: ` <div class="py-8 max-w-6xl mx-auto">

        <!-- Header + Search -->
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">

          <h1 class="text-3xl font-bold text-slate-900">
            Products
          </h1>

          <input
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearch($event)"
            class="w-full md:w-72 p-2 border border-slate-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
            type="text"
            placeholder="Search products..."
          />
        </div>

        <!-- Loading -->
        @if (loading()) {
          <div class="flex items-center justify-center h-40">
            <p class="text-slate-500">Loading products...</p>
          </div>
        }

        <!-- No products -->
        @if (products()?.length === 0 && !loading()) {
          <div class="flex items-center justify-center h-40">
            <p class="text-slate-500">No products available..</p>
          </div>
        }

        <!-- Product Grid -->
        @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            @for (product of products(); track product.id) {
              <app-product-card
                (addToCart)="onAddToCart($event)"
                [product]="product">
              </app-product-card>
            }
          </div>
        }

      </div>
    `,
})
export class Products implements OnInit {
    private readonly store = inject(Store);
    protected readonly products = toSignal(this.store.select(productFeature.selectFilteredProducts));
    protected readonly loading = toSignal(this.store.select(productFeature.selectLoading));

    protected searchQuery = signal('');
    protected onSearch(query: string): void {
        this.store.dispatch(ProductAction.search({ searchQuery: query }));
    }

    ngOnInit(): void {
        this.store.dispatch(ProductAction.load());
    }

    protected onAddToCart(product: Product): void{
      this.store.dispatch(cartActions.addToCart({ product }));
    }
}