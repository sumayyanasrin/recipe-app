import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

isLoggedIn:boolean=false
loginUsername:string=""
constructor(private router:Router){}

ngOnInit(){
  if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
    this.isLoggedIn=true
    this.loginUsername = JSON.parse(sessionStorage.getItem("user")||"").username.split(" ")[0]
  }else{
    this.isLoggedIn=false
    this.loginUsername=""
  }
}

logout(){
  sessionStorage.clear()
  this.router.navigateByUrl("/")
}
}
