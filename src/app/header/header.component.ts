import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { dataStorage } from "../shared/data-storage.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy
{

    private user_subscribable:Subscription;
    isAuthenticated = false;

    constructor(private dataStorage: dataStorage,private authService:AuthService) {}
    
    ngOnDestroy(): void {
        this.user_subscribable.unsubscribe();
    }
   
    logout()
    {
        this.isAuthenticated = false;
    }
   
    ngOnInit(): void {
        this.user_subscribable = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        })
    }



    saveData()
    {
        this.dataStorage.postRecipes();
    }


    getData()
    {
        this.dataStorage.getRecipes().subscribe();
    }
}
