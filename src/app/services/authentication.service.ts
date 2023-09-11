import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/register';
import { Observable } from 'rxjs';
import { JwtAuth } from '../models/jwtAuth';
import { environment } from 'src/environments/environment.development';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private registerUrl = 'Auth/addOrRegister';
  private loginUrl = 'Auth/login';
  private weatherUrl = 'WeatherForecast';

  constructor(private http: HttpClient) {}

  public register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(
      `${environment.apiUrl}/${this.registerUrl}`,
      user
    );
  }

  public login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(
      `${environment.apiUrl}/${this.loginUrl}`,
      user
    );
  }

}
