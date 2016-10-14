import {Component} from "@angular/core";

import { User } from "./shared/user/user";
import { UserService } from "./shared/user/user.service";

@Component({
    selector: "my-app",
    templateUrl: "pages/login/login.component.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
    providers: [UserService]
})
export class AppComponent {
    user: User;
    isLogged = true;

    constructor(private userService: UserService) {
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
        // TODO
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
