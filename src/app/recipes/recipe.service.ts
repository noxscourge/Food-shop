import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";


@Injectable()
export class RecipeService
{
    //public recipeSelected = new Subject<Recipe>()
   // public ingredientsToSend = new Subject<Recipe>();

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
    new Recipe("Hamburger",
    "Very tastefull",
     "https://www.novosti.rs/upload/images/2019b/01/10n/Depositphotos_15890699_xl-2.jpg",
     [
        new Ingredient('Meat',1)
     ]),
     new Recipe("Pizz",
     "Italian masterpiece",
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg",
      [
         new Ingredient('Cheeze',6)
      ])
    ]

    constructor(private shoppingService:ShoppingListService) {}

    getRecipes()
    {
        return this.recipes.slice(); //kopija niza recepata
    }


    getRecipe(id:number)
    {
        return this.recipes[id];
    }
    addIngredientsToShoppingList(ingredients: Ingredient[])
    {
        this.shoppingService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe)
    {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }


    deleteRecipe(id:number)
    {
        this.recipes.splice(id,1)
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(id:number,newRecipe:Recipe)
    {
        this.recipes[id].name = newRecipe.name;
        this.recipes[id].imagePath = newRecipe.imagePath;
        this.recipes[id].description = newRecipe.description;
        this.recipes[id].ingredients = newRecipe.ingredients;
        this.recipesChanged.next(this.recipes.slice());
    }
   
}