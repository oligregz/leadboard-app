import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';

import { UserModel } from '@core/models/user.model';


@Component({
  selector: 'app-list-users',
  imports: [NgClass],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent {
  users = input.required<UserModel[]>();
  loggedUserEmail = input.required<string>();

  showFullRanking = signal(false);

  trackByIndex(index: number): number {
    return index;
  }

  get visibleUsers(): UserModel[] {
    const all = this.users();
    const loggedIndex = all.findIndex(
      (u) => u.email === this.loggedUserEmail(),
    );

    const maxInitialUsers = 10;

    if (this.showFullRanking()) {
      return all;
    }

    if (loggedIndex <= 1) {
      return all.slice(0, maxInitialUsers);
    }

    const result: UserModel[] = [];

    result.push(all[0], all[1]);

    if (loggedIndex > 1) {
      result.push(all[loggedIndex]);
    }

    return result.slice(0, maxInitialUsers);
  }

  get shouldShowEllipsis(): boolean {
    const all = this.users();
    const loggedIndex = all.findIndex(
      (u) => u.email === this.loggedUserEmail(),
    );

    return !this.showFullRanking() && loggedIndex > 2;
  }

  getLoggedUserPosition(user: UserModel): number {
    return this.users().indexOf(user) + 4;
  }
}
