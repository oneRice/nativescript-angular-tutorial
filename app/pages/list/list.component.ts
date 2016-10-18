import {Component, ElementRef, OnInit, ViewChild, NgZone } from "@angular/core";

import * as SocialShare from "nativescript-social-share";

import { TextField } from "ui/text-field";

import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";

@Component({
    selector: "my-list",
    templateUrl: "pages/list/list.component.html",
    styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
    providers: [GroceryListService]
})

export class ListComponent implements OnInit {
    groceryList:Array<Grocery> = [];
    grocery = "";

    isLoading = false;
    listLoaded = false;

    @ViewChild("groceryTextField") groceryTextField: ElementRef;

    constructor(private groceryListService: GroceryListService,
                private zone: NgZone) {

    }

    ngOnInit() {
        this.isLoading = true;
        this.groceryListService.load()
            .subscribe(loadedGroceries => {
                loadedGroceries.forEach((groceryObject) => {
                    this.groceryList.unshift(groceryObject);
                });
                this.isLoading = false;
                this.listLoaded = true;
            });
    }

    add() {
        if (this.grocery.trim() === "") {
            alert("Enter a grocery item");
            return;
        }

        // Dismiss keyboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();

        this.groceryListService.add(this.grocery)
            .subscribe(
                // success
                groceryObject => {
                    this.groceryList.unshift(groceryObject);
                    this.grocery = "";
                },
                // error
                () => {
                    alert({
                        message: "An error occurred while adding an item to your list.",
                        okButtonText: "OK"
                    });
                    this.grocery = "";
                }
            )
        
    }

    delete(item: Grocery) {
        this.groceryListService.delete(item.id)
            .subscribe(
                //success
                () => {
                    this.zone.run(
                        () => {
                            let index = this.groceryList.indexOf(item);
                            this.groceryList.splice(index, 1);
                        }
                    )
                },
                //error
                () => {
                    alert({
                        message: "An error occurred while deleting this item.",
                        okButtonText: "OK"
                    });
                }
            )
    }

    share() {
        let list = [];
        for(let i = 0, size = this.groceryList.length; i < size; i++) {
            list.push(this.groceryList[i].name);
        }
        let listString = list.join(", ").trim();
        SocialShare.shareText(listString);
    }
}