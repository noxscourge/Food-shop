import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthData 
{
  
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
   
}

@Injectable({providedIn:'root'})
export class AuthService
{

    //user = new Subject<User>();
    
    user = new BehaviorSubject<User>(null);

    constructor(private http:HttpClient) {}


    Login(email:string,password:string)
    {
        return this.http.post<AuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCb35_gegIXEfOjRdoDhY8gSQykq21CBMg',
        {
        email:email,
        password:password,
        returnSecureToken:true
        }
        ) .pipe(catchError(this.ErrorHandler),tap(resData=>{

            this.Authentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
         }));
    }


    signUp(email:string, pass:string) {
        return this.http.post<AuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCb35_gegIXEfOjRdoDhY8gSQykq21CBMg',
        {
        email:email,
        password:pass,
        returnSecureToken:true
        }
        )
        .pipe(catchError(this.ErrorHandler), tap(resData=>{

           this.Authentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        })
        
        );
            
        }


        private Authentication(email:string,userId:string,idToken:string, expirationDate:number) 
        {
            const expiration = new Date(new Date().getTime()+ +expirationDate * 1000)
            const user = new User(email,userId,idToken, expiration )
            this.user.next(user);
        }

        
        private ErrorHandler(errorRes:HttpErrorResponse)
        {
            let errorMessage = 'Error is unknown'
            if (!errorRes.error || !errorRes.error.error)
            {
                return throwError(errorMessage)
            }
          
            switch(errorRes.error.error.message)
            {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists'
                break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'The password is invalid or the user does not have a password.'
                  break;
                  case 'USER_DISABLED': 
                  errorMessage ='The user account has been disabled by an administrator.'
                  break;
            }
            return throwError(errorMessage)
          }

    
        }
