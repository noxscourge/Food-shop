import { EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model'

export class ShoppingListService
{

    ingredientChanged = new EventEmitter<Ingredient[]>();
        ingredients: Ingredient[] = [
        new Ingredient("Apples",5),
        new Ingredient("Tomato", 3)
      ]



     getIngredients()
     {
        return this.ingredients.slice();
     }

     addIngredient(ingredient:Ingredient)
     {
         this.ingredients.push(ingredient);
         this.ingredientChanged.emit(this.ingredients);
     }

     addIngredients(ingredients:Ingredient[])
     {
        /* ingredients.map((ingridient)=>{
            this.addIngredient(ingridient);
         })*/

         this.ingredients.push(...ingredients);
         this.ingredientChanged.emit(this.ingredients.slice());
     }
}