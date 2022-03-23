import { Subject } from 'rxjs';
import {Ingredient} from '../shared/ingredient.model'

export class ShoppingListService
{

    //ingredientChanged = new EventEmitter<Ingredient[]>();
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
        ingredients: Ingredient[] = [
        new Ingredient("Apples",5),
        new Ingredient("Tomato", 3)
      ]


    deleteItem(id:number)
{
    this.ingredients.splice(id,1);
    this.ingredientChanged.next(this.ingredients.slice());
}

     getIngredients()
     {
        return this.ingredients.slice();
     }

    getIngredientById(id:number)
    {
        return this.ingredients[id];
    }

    updateIngredient(id:number, name:string, amount:number)
    {
        this.ingredients[id].name = name;
        this.ingredients[id].amount= amount;
        this.ingredientChanged.next(this.ingredients.slice());
    }
     addIngredient(ingredient:Ingredient)
     {
         this.ingredients.push(ingredient);
         this.ingredientChanged.next(this.ingredients);
     }

     addIngredients(ingredients:Ingredient[])
     {
        /* ingredients.map((ingridient)=>{
            this.addIngredient(ingridient);
         })*/

         this.ingredients.push(...ingredients);
         this.ingredientChanged.next(this.ingredients.slice());
     }
}