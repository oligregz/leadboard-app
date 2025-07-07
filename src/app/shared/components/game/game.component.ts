import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';

import { UserService } from '@core/services/user.service';
import { getUserIdFromToken } from '@pages/utils/manage-local-storage.util';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tokinho') tokinhoRef!: ElementRef<HTMLImageElement>;
  @ViewChild('bug') bugRef!: ElementRef<HTMLImageElement>;

  private readonly userService = inject(UserService);
  private loopId?: ReturnType<typeof setInterval>;
  private contId?: ReturnType<typeof setInterval>;

  points = signal(0);
  pointsFinal = signal(0);

  restart(): void {
    globalThis.location.reload();
  }

  ngAfterViewInit(): void {
    globalThis.document.addEventListener('keydown', this.jump);

    this.loopId = globalThis.setInterval(() => this.checkCollision(), 10);
    this.contId = globalThis.setInterval(() => {
      this.points.set(this.points() + 1);
    }, 100);
  }

  jump = (): void => {
    const tokinho = this.tokinhoRef.nativeElement;

    if (!tokinho.classList.contains('jump')) {
      tokinho.classList.add('jump');
      setTimeout(() => tokinho.classList.remove('jump'), 800);
    }
  };

  checkCollision(): void {
    const tokinho = this.tokinhoRef.nativeElement;
    const bug = this.bugRef.nativeElement;

    const bugPosition = bug.offsetLeft;
    const tokinhoBottom = Number.parseInt(
      globalThis.getComputedStyle(tokinho).bottom.replace('px', ''),
      10, 
    );

    if (bugPosition <= 100 && bugPosition > 0 && tokinhoBottom < 80) {
      bug.style.animation = 'none';
      bug.style.left = `${bugPosition}px`;

      clearInterval(this.loopId);
      clearInterval(this.contId);
      globalThis.document.removeEventListener('keydown', this.jump);

      const finalScore = this.points();

      this.pointsFinal.set(finalScore);

      const userId = getUserIdFromToken();

      if (userId === undefined) {
        console.warn('Usuário não logado, não foi possível atualizar os pontos.');
      } else {
        this.userService.updatePoints(finalScore).subscribe({
          next: (user) => {
            console.log('Pontos atualizados com sucesso', user.points);
          },
          error: (error) => {
            console.error('Erro ao atualizar os pontos', error);
          },
        });
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.loopId);
    clearInterval(this.contId);
    globalThis.document.removeEventListener('keydown', this.jump);
  }
}
