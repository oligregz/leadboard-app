import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserModel } from '@core/models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly apiUserUrl = 'http://localhost:3000/user?isActive=';
  private readonly apiUserUrlSignup = 'http://localhost:3000/user/signup';

  constructor(private readonly http: HttpClient) {}

  signup(formData: FormData): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUserUrlSignup}`, formData);
  }

  list(isActive: boolean): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUserUrl}${isActive}`);
  }

  listAllExceptTopThree(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      `${this.apiUrl}/ranking/all-except-top-three`,
    );
  }

  updatePoints(points: number): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.apiUrl}/user/points`, {
      points,
    });
  }
}
