import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }
  
  id:number;
  editMode:boolean=false;
  recipeForm: FormGroup;
  checkIngredients:boolean=false;

  ngOnInit(){

    this.route.params.subscribe((params:Params)=>{
      this.id = (+params['id']);
      this.editMode = params['id']!=null;
      this.initForm();


  
    })

  }

  onSubmit()
  {
    const newRecipe = new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'], this.recipeForm.value['ingredients']);
    if(this.editMode)
    {
      this.recipeService.updateRecipe(this.id, newRecipe);
      this.recipeForm.reset();
      this.router.navigate(['/recipes'], {relativeTo:this.route})
      
      
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  private initForm()
  {
    let recipeName ='';
    let recipeImagePath ='';
    let recipeDescription ='';
    let recipeIngredients = new FormArray([]);


    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName =  recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients'])
      {
        
          for (let ingredients of recipe.ingredients)
          {
           
            recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredients.name,Validators.required),
              'amount': new FormControl(ingredients.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            }))
            
          }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'ingredients': recipeIngredients
    })

  }

  deleteIngredientAllIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).clear();
    this.checkIngredients=true;

  }


  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
    
  }



  deleteIngredientFromForm(id:number)
 {
   if ((<FormArray>this.recipeForm.get('ingredients')).controls[0] ===(<FormArray>this.recipeForm.get('ingredients')).controls[id]){
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
   this.checkIngredients=true;
   }
   else
   {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
    this.checkIngredients=false;
   }
    
 }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
    this.checkIngredients=false;
    
  
  }

  onCancel()
  {
    this.router.navigate(['../'], {relativeTo:this.route})
  }

}
