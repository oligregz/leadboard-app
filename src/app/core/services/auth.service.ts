import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginModel } from '../models/login.model';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:3000/auth';

  constructor(private readonly http: HttpClient) {}

  signup(user: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.apiUrl}/login`, user);
  }
}
