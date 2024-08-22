import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environments';

import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl
  private http = inject(HttpClient)

  private _currentUser = signal <User | null> (null)
  private _authStatus = signal <AuthStatus>(AuthStatus.checking)

  //De esta manera publico la informacion privada sin que nadie pueda modificarlo
  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser())
  public authStatus = computed( () => this._authStatus())

  constructor() {
    this.checkAuthStatus().subscribe();    // le voy el check que uso en el app.component
  }

  // DRY
  private setAuthentication(user: User, token: string):boolean{

    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.authenticated)
    localStorage.setItem('token', token)

    return true
  }

  login (email: string, password: string): Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`
    const body = {email, password}

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map( ({user, token}) => this.setAuthentication(user, token)),
      catchError( err => throwError( () => err.error.message)
      )
    )
  }

  checkAuthStatus(): Observable<boolean>{

    const url = `${this.baseUrl}/auth/check-token`
    const token = localStorage.getItem('token')

    if (!token) {
      this.logout();
      return of (false);}    //Es la manera de darle valor false a un Observable

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)  //en postman analizo la respuesta todo

    return this.http.get<CheckTokenResponse>(url,{ headers })
    .pipe(
      map( ({user, token}) => this.setAuthentication(user, token)),

      catchError(()=> {
        this._authStatus.set(AuthStatus.notAuthenticated)
        return of (false)})
    )
  }

  logout(){
    localStorage.removeItem('token')
    this._currentUser.set(null)
    this._authStatus.set(AuthStatus.notAuthenticated)

    return
  }
}
