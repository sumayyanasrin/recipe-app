import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = 'https://recipe-server-km0j.onrender.com'

  constructor(private http: HttpClient) { }

  getAllRecipesAPI() {
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  
  saveTestimonialAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }
  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }
// append token to header

appendToken(){
  const token=sessionStorage.getItem('token')
  let headers= new HttpHeaders()
  if(token){
    headers=headers.append('authorization',`Bearer ${token}`)
  }
  return {headers}
}

getARecipeAPI(id:string){
  return this.http.get(`${this.server_url}/recipes/${id}/view`,this.appendToken())
}
getRelatedRecipeAPI(cuisine:string){
  return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
}

downloadRecipe(id:string,recipeDetails:any){
  return this.http.post(`${this.server_url}/recipie/:recipeId/download`,recipeDetails,this.appendToken())
}

savedRecipeAPI(recipeDetails:any){
  return this.http.post(`${this.server_url}/recipe/save`,recipeDetails,this.appendToken())

}

getSavedRecipesAPI(){
  return this.http.get(`${this.server_url}/saved-recipes`,this.appendToken())

}

removeSavedRecipeAPI(id:any){
  return this.http.delete(`${this.server_url}/saved-recipes/${id}/remove`,this.appendToken())

}

getAllUsers(){
  return this.http.get(`${this.server_url}/admin/all-users`,this.appendToken())
}

getAllDownloads(){
  return this.http.get(`${this.server_url}/admin/all-downloads`,this.appendToken())
}

getAllTestimonyAPI(){
  return this.http.get(`${this.server_url}/all-testimonys`,this.appendToken())
}

getUpdateTestimonyAPI(id:string,status:string){
  return this.http.get(`${this.server_url}/testimonys/${id}?status=${status}`,this.appendToken())
}

addRecipeAPI(recipeDetails:any){
  return this.http.post(`${this.server_url}/add-recipe`,recipeDetails,this.appendToken())
}


}

