import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { dataStorage } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class recipeResolverService implements Resolve<Recipe[]>
{
    constructor(private dataStorage:dataStorage, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
       
      const recipes = this.recipeService.getRecipes();

      if (recipes.length===0) {
          return this.dataStorage.getRecipes();
      }
      else {
          return recipes;
      }
    }

}