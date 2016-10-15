import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
    selector: "my-login",
    templateUrl: "pages/login/login.component.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
    providers: [UserService]
})

export class LoginComponent {
    user: User;
    isLogged = true;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.user = new User();
        this.user.email = "user@nativescript.org";
        this.user.password = "password";
    }

    submit() {
        if (this.isLogged) {
            this.login()
        } else {
            this.signup()
        }
    }

    login() {
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(["/list"]),
                (error) => alert("Unfortunately we could not find your account.")
            );
    }

    signup() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleDisplay();
                },
                () => {
                    alert("Unfortunately, we were unable to create your account.");
                }
            );
    }

    toggleDisplay() {
        this.isLogged = !this.isLogged;
    }
}