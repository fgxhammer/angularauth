import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IUser } from './interfaces/user'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"

  constructor(private _http: HttpClient, private _router: Router) { }

  registerUser(user: IUser) {
    return this._http.post<IUser>(this._registerUrl, user)
  }

  loginUser(user: IUser) {
    return this._http.post<IUser>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem("token")
    this._router.navigate(["/events"])
  }

  // Check if jwt exists in localstorage
  loggedIn() {
    return !!localStorage.getItem("token")
  }

  getToken() {
    return localStorage.getItem("token")
  }
}
