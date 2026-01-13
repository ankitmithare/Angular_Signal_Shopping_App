import { Component, inject } from "@angular/core";
import { ButtonComponent } from "../../shared/components/button";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, LogOut, User, ShoppingCart, ShoppingBag } from "lucide-angular";
import { Store } from "@ngrx/store";
import { cartFeature } from "../../pages/cart/store/cart-features";
import { toSignal } from "@angular/core/rxjs-interop";
import { authActions } from "../../shared/store/auth-actions";

@Component({
    selector: "app-header",
    imports: [ButtonComponent, RouterLink, LucideAngularModule],
    template: `
        <div class="sticky top-0 z-50 w-full px-4 py-3 bg-slate-900 text-white shadow-lg">
        <nav class="container mx-auto flex items-center justify-between">

            <!-- Logo -->
            <a routerLink="/" class=" flex items-center text-3xl font-bold tracking-tight no-underline">
             <lucide-icon [img]="icons.ShoppingBag" class="size-6 mr-2"></lucide-icon>
             <span>My Store</span>
            </a> 

            <!-- Right Menu -->
            <div class="flex items-center gap-3">

            <!-- Logout -->
            <button
                appButton
                variant="ghost"
                type="button"
                (click)="logout()"
                class="flex items-center text-white hover:text-gray-300 hover:bg-white/10 transition"
            >
                <lucide-icon [img]="icons.LogOut" class="size-5 mr-2"></lucide-icon>
                Logout
            </button>

            <!-- Profile -->
            <button
                routerLink="/profile"
                appButton
                variant="ghost"
                type="button"
                class="flex items-center text-white hover:text-gray-300 hover:bg-white/10 transition"
            >
                <lucide-icon [img]="icons.User" class="size-5 mr-2"></lucide-icon>
                Profile
            </button>

            <!-- Cart -->
            <button
                appButton
                variant="ghost"
                type="button"
                routerLink="/cart"
                class="relative flex items-center text-white hover:text-gray-300 hover:bg-white/10 transition"
            >
                <lucide-icon [img]="icons.ShoppingCart" class="size-5"></lucide-icon>

                <!-- Cart Badge -->
                <span
                class="absolute -top-1 -right-1 size-5 flex items-center justify-center
                        bg-amber-500 text-xs font-semibold rounded-full text-slate-900"
                >
                {{ cartItemCount() }}
                </span>
            </button>

            </div>

        </nav>
        </div>
    `,
})
export class Header {
    protected readonly icons = { LogOut, User, ShoppingCart, ShoppingBag };
    private readonly store = inject(Store);
    protected readonly cartItemCount = toSignal(this.store.select(cartFeature.selectCartCount), 
    {
        initialValue:0,
    });

    protected logout() {
        this.store.dispatch(authActions.logout());
    }
}