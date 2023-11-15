import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, catchError, throwError, tap } from 'rxjs';

import { User } from '../models/user.models';


interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor(
    public auth: AngularFireAuth,
    public http: HttpClient
  ) { }

  signUp( email: string, password: string ) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ environment.firebaseConfig.apiKey }`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe( 
      catchError( this.handleError ), 
      tap( response => {
        this.handleAuthentication(
          response.email, 
          response.localId,
          response.idToken,
          +response.expiresIn)
      })
    );
  }

  login( email: string, password: string ) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ environment.firebaseConfig.apiKey }`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe( 
      catchError( this.handleError ), 
      tap( response => {
        this.handleAuthentication(
          response.email, 
          response.localId,
          response.idToken,
          +response.expiresIn)
      })
    );
  }

  private handleAuthentication( email: string, userId: string, token: string, expiresIn: number ) {
    const expirationDate = new Date( 
      new Date().getTime() + expiresIn * 1000 
    );

    const user = new User ( 
      email, 
      userId,
      token,
      expirationDate
    );

    this.user.next( user );
  }

  private handleError( errorResponse: HttpErrorResponse ) {
    let errorMessage = 'An Unknown error occurred!';
      if ( !errorResponse.error || !errorResponse.error.error ) {
        return throwError(() =>  errorMessage );
      }
      switch ( errorResponse.error.error.message ) {
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Email or Password invalid';
          break;
        case 'USER_DISABLED':
          errorMessage = 'Please contact an administrator';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'This email is already registered.';
          break;
      }

      return throwError(() => new Error( errorMessage ));
  }

}
