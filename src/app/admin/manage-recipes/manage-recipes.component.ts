import { Component } from '@angular/core';
import { RecipeModel } from '../Model/RecipeModel.';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipes',
  templateUrl: './manage-recipes.component.html',
  styleUrl: './manage-recipes.component.css'
})
export class ManageRecipesComponent {

  recipeDetails:RecipeModel={}
  Ingredients:any=[]
  Instructions:any=[]
  mealType:any=[]

 constructor(private api:ApiService,private router:Router){}


  addIngredients(value:string){
    this.Ingredients.push(value)
  }

  removeIngredients(value:string){
    this.Ingredients = this.Ingredients.filter((item:string) => item != value)
  }

  addInstructions(value:string){
    this.Instructions.push(value)
  }

  removeInstructions(value:string){
    this.Instructions = this.Instructions.filter((item:string) => item != value)
  }

  mealTypeSelect(checkEvent:any){
    if(checkEvent.target.checked){
      !this.mealType.includes(checkEvent.target.value)&&this.mealType.push(checkEvent.target.name)
    }else{
      this.mealType=this.mealType.filter((item:any)=>item!=checkEvent.target.name)
    }
  }

  addRecipe(){
    this.recipeDetails.ingredients=this.Ingredients
    this.recipeDetails.instructions=this.Instructions
    this.recipeDetails.mealType=this.mealType
    const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=this.recipeDetails
    if(name&& ingredients!.length>0&& instructions!.length>0 && prepTimeMinutes&& cookTimeMinutes&&servings&&difficulty&&cuisine&&caloriesPerServing&&image&&mealType!.length>0){
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next:(res:any)=>{
          alert("recipe added")
          this.router.navigateByUrl('/admin/all-recipes')
          this.recipeDetails={}
          this.Ingredients=[]
          this.Instructions=[]
          this.mealType=[]

        },
        error:(reason:any)=>{
          alert(reason.error)
          this.recipeDetails={}
          this.Ingredients=[]
          this.Instructions=[]
          this.mealType=[]
        }
      })
    } else{
      alert("Please provide values")
    }
  }



}