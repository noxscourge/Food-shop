import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  //@ViewChild('nameInput', {static:false}) nameInputRef:ElementRef;
  //@ViewChild('amountInput',{static:false}) amountInputRef:ElementRef;
  
  editSubscribable:Subscription;
  @ViewChild('f') slForm:NgForm;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private shoppingService:ShoppingListService) { }
  
  
  ngOnDestroy(): void {
    this.editSubscribable.unsubscribe();
  }
  
  ngOnInit(): void {

    this.editSubscribable=this.shoppingService.startedEditing.subscribe((index:number)=>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingService.getIngredientById(index);

      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmitItem(form:NgForm)
  {
      // const newIngredientName = this.nameInputRef.nativeElement.value;
      // const newIngredientAmount = this.amountInputRef.nativeElement.value;
      // const newIngredient = new Ingredient(newIngredientName,newIngredientAmount);
      const value = form.value;
      const newIngredient = new Ingredient(value.name,value.amount);
      if(this.editMode){
        this.shoppingService.updateIngredient(this.editedItemIndex,value.name,value.amount)
        form.reset();
        this.editMode=false;
      } else {
      this.shoppingService.addIngredient(newIngredient);
      form.reset();
      }
  }

  clearForm()
  {
    this.slForm.reset();
    this.editMode = false;
  }


  deleteIngredient()
  {
    this.shoppingService.deleteItem(this.editedItemIndex);
    this.slForm.reset();
  }
}
