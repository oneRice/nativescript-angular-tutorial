import {  Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
    selector: "my-login",
    templateUrl: "pages/login/login.component.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    user: User;
    isLogged = true;
    @ViewChild("container") container: ElementRef;

    constructor(
        private userService: UserService,
        private router: Router,
        private page: Page
    ) {
        this.user = new User();
        this.user.email = "user@nativescript.org";
        this.user.password = "password";
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
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
        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLogged ? new Color("white") : new Color("#301217"),
            duration: 200
        });
    }
}