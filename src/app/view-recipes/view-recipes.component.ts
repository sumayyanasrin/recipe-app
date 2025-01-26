
import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'



@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent {
  id:string=''
  recipe:any={}
  allRelatedRecipe:any=[]
  constructor(private activateRoute:ActivatedRoute,private api:ApiService){}

  ngOnInit(){
    this.activateRoute.params.subscribe((res:any)=>{
      this.id=res.id
      console.log(this.id);
      this.getArecipe(this.id)
      
    })

  }

  getArecipe(id:string){
    this.api.getARecipeAPI(id).subscribe((res:any)=>{
      console.log(res)
      this.recipe=res
      this.viewAllRelatedRecipe(res.cuisine)
    })
  }
  viewAllRelatedRecipe(cuisine:string){
    this.api.getRelatedRecipeAPI(cuisine).subscribe({
      next:((res:any)=>{
        if(res.length>1){
          this.allRelatedRecipe= res.filter((item:any)=>item.name!=this.recipe.name)
        }
      }),
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  addDownloadRecipe(){
    const recipeDetails={
      name:this.recipe.name,
      cuisine:this.recipe.cuisine
    }
    this.api.downloadRecipe(this.id,recipeDetails).subscribe((res:any)=>{
      this.generatePDF()
    })
  }

  generatePDF(){
    let pdf= new jspdf()
    pdf.setFontSize(16)
    pdf.setTextColor("brown")
    pdf.text(this.recipe.name,70,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine : ${this.recipe.cuisine} `,10,20)
    pdf.text(`Servings : ${this.recipe.servings} `,10,25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty} `,10,30)
    pdf.text(`Total Preparation Time : ${this.recipe.prepTimeMinutes} `,10,35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes} `,10,40)
    pdf.text(`Total Calories Per Unit : ${this.recipe.caloriesPerServing} `,10,45)

    // table

    let head = [['Ingreadients Needed','Cooking Instructions']]
    let body:any =[]
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:55})
    pdf.output('dataurlnewwindow')
    pdf.save('Recipie.pdf')

  }

  saveRecipe(){
    const {_id,name,cuisine,image}=this.recipe
    this.api.savedRecipeAPI({id:_id,name,cuisine,image}).subscribe({
      next:(res:any)=>{
        alert("Recipe Saved")
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }



}
