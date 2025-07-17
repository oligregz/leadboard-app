import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginModel } from '../models/login.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';
  private readonly apiVerificationUrl = 'http://localhost:3000/auth/validateUserByEmail?';

  constructor(private readonly http: HttpClient) {}

  login(user: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.apiUrl}/login`, user);
  }

  verification(codeVerify: string, userEmail: string): Observable<unknown> {
    return this.http.get(`${this.apiVerificationUrl}codeVerify=${codeVerify}&userEmail=${userEmail}`);
  }
}
