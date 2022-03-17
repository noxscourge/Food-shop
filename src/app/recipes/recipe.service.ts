import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";


@Injectable()
export class RecipeService
{
    public recipeSelected = new EventEmitter<Recipe>()
    public ingredientsToSend = new EventEmitter<Recipe>();

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

    addIngredientsToShoppingList(ingredients: Ingredient[])
    {
        this.shoppingService.addIngredients(ingredients);
    }
   
}