import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "../../shared/components/button";
import { Field, form, minLength, required, validate } from "@angular/forms/signals";
import { FormError } from "../../shared/components/form-error";
import { registerSchema } from "./register-schema";
import { Store } from "@ngrx/store";
import { toSignal } from "@angular/core/rxjs-interop";
import { authFeatures } from "../../shared/store/auth-feature";
import { authActions } from "../../shared/store/auth-actions";

@Component({
    selector: "app-register",
    templateUrl: "./register.html",
    styleUrls: ["./register.css"],
    imports: [ButtonComponent, RouterLink, Field, FormError]
})
export class Register {
    registerModel = signal({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    registerForm = form(this.registerModel, registerSchema)
    private readonly store = inject(Store);
    protected readonly isLoading = toSignal(this.store.select(authFeatures.selectIsLoading));

    onSubmit(event: Event) {
        event.preventDefault();
        const id = Date.now();
        const {confirmPassword, ...rest} = this.registerForm().value();
        const registerRequest = { id, ...rest };
        this.store.dispatch(authActions.register(registerRequest));
    }
}