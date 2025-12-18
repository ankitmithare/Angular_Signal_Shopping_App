import { Component, signal } from "@angular/core";
import { ButtonComponent } from "../../shared/components/button";
import { RouterLink } from "@angular/router";

// import { form } from "@angular/forms/signals";

@Component({
    selector: "app-login",
    templateUrl: "./login.html",
    styleUrls: ["./login.css"],
    imports: [ButtonComponent, RouterLink]
})
export class Login{
    loginModel = signal({
        username: '',
        password: ''
    }); 

    // loginForm = form(this.loginModel);
}