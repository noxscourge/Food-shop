import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map,tap,take, exhaustMap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn:'root'})
export class dataStorage
{
        constructor(private https:HttpClient,private recipeService:RecipeService, private authService:AuthService) {}


        postRecipes()
        {
           const recipes =  this.recipeService.getRecipes();
           this.https.put('https://ng-course-recipe-2a6d9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(
               response => {
                   console.log(response);
               }
           )
        } 


        getRecipes()
        {

                return this.https.get<Recipe[]>('https://ng-course-recipe-2a6d9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').
                pipe(map(recipes=>{
                return recipes.map(recipe =>
                    {
                    return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),tap(recipes=>{

                this.recipeService.setRecipes(recipes);
            })
            )
            
        }
        }
