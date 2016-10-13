import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [NativeScriptModule],
    bootstrap: [AppComponent]
})

export class AppModule {

}