import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import {environment} from '../../environments/environment';

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
    private expirationToken:any;

    constructor(private http:HttpClient, private router:Router) {}


    Login(email:string,password:string)
    {
        return this.http.post<AuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
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
        return this.http.post<AuthData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
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
    

        
        autoLogin()
        {
           const userData:{ 
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDay: string} = JSON.parse(localStorage.getItem('userData'));
           
           
           if (!userData)
            {
                return;
            }

            const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDay));
         
            if (loadedUser.token)
            {
                this.user.next(loadedUser);
                const expirationDate =  new Date(userData._tokenExpirationDay).getTime() - new Date().getTime(); // buduce vreme - trenutno (ms)
                this.autologout(expirationDate)
            }
            
        }

        private Authentication(email:string,userId:string,idToken:string, expirationDate:number) 
        {
            const expiration = new Date(new Date().getTime()+ +expirationDate * 1000)
            const user = new User(email,userId,idToken, expiration )
            this.user.next(user);
            this.autologout(expirationDate * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
        }

        autologout(expirationDuration:number)
        {
          this.expirationToken =  setTimeout(()=>{
                this.logout();
            },expirationDuration)
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

          logout()
          {
              this.user.next(null);
              this.router.navigate(['/auth']);
              localStorage.removeItem('userData');

              if (this.expirationToken)
              {
                  clearTimeout(this.expirationToken);
              }
              this.expirationToken=null;
          }
    
        }
