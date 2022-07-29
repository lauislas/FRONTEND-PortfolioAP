import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/loginUsuario';
import { NuevoUsuario } from '../models/nuevoUsuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "https://portfolioargp.herokuapp.com/auth/";

 
  constructor(private http: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.authUrl + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.http.post<JwtDto>(this.authUrl + 'login', loginUsuario);
  }
}

