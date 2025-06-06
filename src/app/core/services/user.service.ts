import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserModel } from '@core/models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/user';

  constructor(private readonly http: HttpClient) {}

  signup(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/signup`, user);
  }
}
