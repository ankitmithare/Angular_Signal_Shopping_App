import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "../../shared/components/button";

@Component({
    selector: "app-register",
    templateUrl: "./register.html",
    styleUrls: ["./register.css"],
    imports: [ButtonComponent, RouterLink]
})
export class Register{
    onSubmit(){
        console.log("Register form submitted");
    }
}