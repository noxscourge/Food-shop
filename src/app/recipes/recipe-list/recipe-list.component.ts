import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Recipe} from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("Recipe","This is recipe test", "https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2016/howcuttingdo.jpg")
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe:Recipe)
  {
    this.recipeWasSelected.emit(recipe);
  }
}
