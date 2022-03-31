import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { Spinner } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations:[AlertComponent,Spinner,DropdownDirective],
    imports:[CommonModule],
    exports:[AlertComponent,Spinner,DropdownDirective,CommonModule]
})
export class SharedModule
{

}