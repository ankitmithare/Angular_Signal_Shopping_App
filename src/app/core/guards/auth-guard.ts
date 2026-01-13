import { inject } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { authFeatures } from "../../shared/store/auth-feature";
import { map } from "rxjs";
import { NgToastService } from "ng-angular-popup";

export const authGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);
    const tost = inject(NgToastService);

    return store.select(authFeatures.selectIsAuthencited).pipe(
        map((isAuthenticated) => {
            if (!isAuthenticated) {
                tost.info('Please Login to continue', 'INFO');
                return router.createUrlTree(['/login']);
            }
            return true;
        })
    );
};