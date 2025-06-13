import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';

import { TopThreeComponent } from 'src/app/top-three/top-three.component';

import { ListUsersComponent } from '../../list-users/list-users.component';


@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [TopThreeComponent, ListUsersComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  rankingUsers = signal<UserModel[]>([]);

  otherUsers = computed(() => this.rankingUsers().slice(3));

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void {
    this.userService.list().subscribe({
      next: (users) => {
        const sortedUsers = [...users].sort(
          (a, b) => (b.points || 0) - (a.points || 0),
        );

        this.rankingUsers.set(sortedUsers);
      },
      error: (error) => {
        if (error.status === 401) {
          console.error('Erro ao buscar usuários:', error);
          this.router.navigate(['/login']);
        }
        console.error('Erro ao buscar usuários:', error);
      },
    });
  }
}
