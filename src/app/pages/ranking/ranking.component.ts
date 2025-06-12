import { Component, inject, signal } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { Router } from '@angular/router';
import { TopThreeComponent } from 'src/app/top-three/top-three.component';
import { UserModel } from '@core/models/user.model';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [TopThreeComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  rankingUsers = signal<UserModel[]>([]);

  listUsers(): void {
    this.userService.list().subscribe({
      next: (users) => {
        this.rankingUsers.set(users);
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
