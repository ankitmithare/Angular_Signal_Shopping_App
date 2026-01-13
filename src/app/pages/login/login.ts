import { Component, inject, signal } from "@angular/core";
import { ButtonComponent } from "../../shared/components/button";
import { RouterLink } from "@angular/router";
import { Field, form, minLength, required } from "@angular/forms/signals";
import { FormError } from "../../shared/components/form-error";
import { Store } from "@ngrx/store";
import { authActions } from "../../shared/store/auth-actions";
import { authFeatures } from "../../shared/store/auth-feature";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-login",
    templateUrl: "./login.html",
    styleUrls: ["./login.css"],
    imports: [ButtonComponent, RouterLink, Field, FormError]
})
export class Login{
    loginModel = signal({
        username: '',
        password: ''
    }); 

    loginForm = form(this.loginModel, (rootPath) => {
        required(rootPath.username, {message: 'Username is required'});
        required(rootPath.password, {message: 'Password is required'});
        minLength(rootPath.password, 6, {message: 'Password must be at least 6 characters long'});
    });

    private readonly store = inject(Store);
    protected readonly isLoading = toSignal(this.store.select(authFeatures.selectIsLoading));

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.loginForm().valid()) {
            // const { username, password } = this.loginForm().value();
            // console.log('Login submitted:', { username, password });
            this.store.dispatch(authActions.login(this.loginForm().value()));
        } else {
            console.log('Form is invalid');
        }
    }
}