import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';


export interface State 
{
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex:number
}

export interface AppState
{
  shoppingList: State
}

const initialState:State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)], editedIngredient:null, editedIngredientIndex:-1
};

export function shoppingListReducer(
  state:State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

      case ShoppingListActions.UPDATE_INGREDIENT:
       

      const ingredient = state.ingredients[state.editedIngredientIndex] //uzimam tacno ingredient sa indeksom
      const updateIngredient = { //pravim kopiju i zamenjujem updejtovan ingridient
        ...ingredient,
        ...action.payload
      }

      const updatedIngredient = [...state.ingredients] // pravim niz ingredienta
      updatedIngredient[state.editedIngredientIndex] = updateIngredient; // ubacujem updejtovan ingridient 


      return {
          ...state,
          ingredients: updatedIngredient,
          editedIngredientIndex: -1,
          editedIngredient: null
        };

      case ShoppingListActions.DELETE_INGRIDIENT:
        return {
          ...state,
          editedIngredientIndex: -1,
          editedIngredient: null,
          ingredients: state.ingredients.filter((ig, igIndex) => {
            return  igIndex!==state.editedIngredientIndex;
          })
        };

        case ShoppingListActions.START_EDIT:
          return {
            ...state,
            editedIngredientIndex: action.payload,
            editedIngredient: {...state.ingredients[action.payload]}
            
          };

          case ShoppingListActions.STOP_EDIT:
          return {
            ...state,
            editedIngredientIndex: -1,
            editedIngredient: null
            
          };
  
    
    default:
      return state;
  }
}
