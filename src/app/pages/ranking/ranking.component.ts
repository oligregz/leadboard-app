import { Component, inject } from '@angular/core';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent {
  private readonly userService = inject(UserService);

  listUsers(): void {
    this.userService.list().subscribe({
      next: (users) => {
        console.log(users);
      },
    });
  }
}
