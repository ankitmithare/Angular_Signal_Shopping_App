import { Component, inject } from "@angular/core";
import { ButtonComponent } from "../../shared/components/button";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, LogOut, User, ShoppingCart, ShoppingBag, Menu } from "lucide-angular";
import { Store } from "@ngrx/store";
import { cartFeature } from "../../pages/cart/store/cart-features";
import { toSignal } from "@angular/core/rxjs-interop";
import { authActions } from "../../shared/store/auth-actions";

@Component({
    selector: "app-header",
    imports: [ButtonComponent, RouterLink, LucideAngularModule],
    template: `
       <div class="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-lg">
            <nav class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">

    <!-- Logo -->
    <a
      routerLink="/"
      class="flex items-center gap-2
             text-xl sm:text-2xl lg:text-3xl
             font-bold tracking-tight"
    >
      <lucide-icon
        [img]="icons.ShoppingBag"
        class="size-5 sm:size-6"
      ></lucide-icon>
      <span>My Store</span>
    </a>

    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-2 lg:gap-3">

      <!-- Logout -->
      <button
        appButton
        variant="ghost"
        type="button"
        (click)="logout()"
        class="flex items-center gap-2
               text-white hover:text-gray-300
               hover:bg-white/10 transition"
      >
        <lucide-icon [img]="icons.LogOut" class="size-5"></lucide-icon>
        <span class="hidden lg:inline">Logout</span>
      </button>

      <!-- Profile -->
      <button
        routerLink="/profile"
        appButton
        variant="ghost"
        type="button"
        class="flex items-center gap-2
               text-white hover:text-gray-300
               hover:bg-white/10 transition"
      >
        <lucide-icon [img]="icons.User" class="size-5"></lucide-icon>
        <span class="hidden lg:inline">Profile</span>
      </button>

      <!-- Cart -->
      <button
        routerLink="/cart"
        appButton
        variant="ghost"
        type="button"
        class="relative flex items-center
               text-white hover:text-gray-300
               hover:bg-white/10 transition"
      >
        <lucide-icon [img]="icons.ShoppingCart" class="size-5"></lucide-icon>

        <span
          class="absolute -top-1 -right-1
                 size-5 flex items-center justify-center
                 bg-amber-500 text-xs font-semibold
                 rounded-full text-slate-900"
        >
          {{ cartItemCount() }}
        </span>
      </button>

    </div>

    <!-- Mobile Menu Button -->
    <button
      class="md:hidden p-2 rounded-lg
             hover:bg-white/10 transition"
      (click)="isMenuOpen = !isMenuOpen"
      aria-label="Toggle menu"
    >
      <lucide-icon [img]="icons.Menu" class="size-6"></lucide-icon>
    </button>

  </nav>

  <!-- Mobile Menu -->
   @if(isMenuOpen){
      <div
    class="md:hidden
           border-t border-slate-700
           bg-slate-900 px-4 py-4 space-y-3"
  >

    <button
      (click)="logout(); isMenuOpen = false"
      class="w-full flex items-center gap-3
             p-3 rounded-lg
             hover:bg-white/10 transition"
    >
      <lucide-icon [img]="icons.LogOut" class="size-5"></lucide-icon>
      Logout
    </button>

    <button
      routerLink="/profile"
      (click)="isMenuOpen = false"
      class="w-full flex items-center gap-3
             p-3 rounded-lg
             hover:bg-white/10 transition"
    >
      <lucide-icon [img]="icons.User" class="size-5"></lucide-icon>
      Profile
    </button>

    <button
      routerLink="/cart"
      (click)="isMenuOpen = false"
      class="w-full flex items-center gap-3
             p-3 rounded-lg
             hover:bg-white/10 transition relative"
    >
      <lucide-icon [img]="icons.ShoppingCart" class="size-5"></lucide-icon>
      Cart

      <span
        class="absolute right-4
               size-5 flex items-center justify-center
               bg-amber-500 text-xs font-semibold
               rounded-full text-slate-900"
      >
        {{ cartItemCount() }}
      </span>
    </button>

  </div>
   }
</div>
    `,
})
export class Header {
    isMenuOpen = false;
    protected readonly icons = { LogOut, User, ShoppingCart, ShoppingBag, Menu };
    private readonly store = inject(Store);
    protected readonly cartItemCount = toSignal(this.store.select(cartFeature.selectCartCount), 
    {
        initialValue:0,
    });

    protected logout() {
        this.store.dispatch(authActions.logout());
    }
}