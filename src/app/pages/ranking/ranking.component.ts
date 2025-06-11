import { Component, inject } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { Router } from '@angular/router';
import { TopThreeComponent } from 'src/app/top-three/top-three.component';

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

  listUsers(): void {
    this.userService.list().subscribe({
      next: (users) => {
        console.log(users);
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
