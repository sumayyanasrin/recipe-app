import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:FormGroup

constructor(private fb:FormBuilder,private api:ApiService,private router:Router){
this.loginForm = this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})
}

login(){
  if(this.loginForm.valid){
    const reqBody = {
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    this.api.loginAPI(reqBody).subscribe({
      next: (res: any) => {
        console.log(res); // Check the response structure in the console
        sessionStorage.setItem("user", JSON.stringify(res.existingUser)); // Use existingUser
        sessionStorage.setItem("token", res.token);
      
        this.loginForm.reset();
      
        if (res.existingUser.role == "user") {
          alert("Login Successful");
          this.router.navigateByUrl('/');
        }
        else{
          alert("Login Successful");
          this.router.navigateByUrl('/admin')
        }
      },
      error:(reason:any)=>{
        alert(reason.console.error)
        
      }
    })
  }
  else{
    alert("Invalid Credentials")
  }
}

}
