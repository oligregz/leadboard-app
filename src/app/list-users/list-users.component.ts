import { Component, input } from '@angular/core';

import { UserModel } from '@core/models/user.model';


@Component({
  selector: 'app-list-users',
  imports: [],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent {
  users = input.required<UserModel[]>();

  trackByIndex(index: number): number {
    return index;
  }
}
