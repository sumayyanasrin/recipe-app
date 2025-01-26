import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  allRecipes:any=[]
  allDummyRecipes:any=[]
  searchKey : string = ""
  p:number = 1;
  constructor(private api:ApiService,private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes = res
      this.allDummyRecipes = this.allRecipes
      // console.log(this.allRecipes);
      
    })
  }

  filterRecipes(recipeType:string,recipeName:string){
    this.allRecipes = this.allDummyRecipes.filter((item:any)=>item[recipeType].includes(recipeName))

  }
  viewRecipes(recipeId : string){
if(sessionStorage.getItem("token")){
 this.router.navigateByUrl(`recipe/${recipeId}/view`)
} else{
  alert("Please  Login to View Recipes")
} 
}

}
