import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }
  
  authForm:NgForm
  inLoginMode = true;
  isLoading = false;
  error :string = null;
  ngOnInit(): void {
  }


  changeStatusOfLogin()
  {
    this.inLoginMode = !this.inLoginMode;
  }

  onSubmit(authForm:NgForm){

    if (!authForm.valid) {
      return;
    }
    else {
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs:Observable<AuthData>

    this.isLoading = true;

    if (this.inLoginMode) {
      authObs = this.authService.Login(email,password);
    }

    else { 
      
     authObs =  this.authService.signUp(email,password);
  }

  authObs.subscribe(resData=>{
    console.log(resData); 
    this.isLoading = false;
    this.router.navigate(['/recipes']);

  },errorMessage=>{
    console.log(errorMessage);
    this.error  = errorMessage;
    this.isLoading = false;
  });
}
  authForm.reset();
  }
}
  