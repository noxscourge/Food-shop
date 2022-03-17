import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static:false}) nameInputRef:ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputRef:ElementRef;
  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
  }


  onAddItem()
  {
      const newIngredientName = this.nameInputRef.nativeElement.value;
      const newIngredientAmount = this.amountInputRef.nativeElement.value;
      const newIngredient = new Ingredient(newIngredientName,newIngredientAmount);
      this.shoppingService.addIngredient(newIngredient);
  }
}
