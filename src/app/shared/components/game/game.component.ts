import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
  private readonly router = inject(Router);

  private loopId?: ReturnType<typeof setInterval>;
  private contId?: ReturnType<typeof setInterval>;
  private speedIncreaseId?: ReturnType<typeof setInterval>;
  private imageSwapId?: ReturnType<typeof setInterval>;

  private animationDuration = 2000; // Começa com 2s
  private readonly bugImages = ['bug.png', 'bug2.png', 'bug-tall.png'];
  private currentBugImageIndex = 0;

  points = signal(0);
  pointsFinal = signal(0);
  isGameStarted = signal(false);

  ngAfterViewInit(): void {
    // Inicializa com animação pausada
    this.bugRef.nativeElement.style.animationPlayState = 'paused';
  }

  startGame(): void {
    this.isGameStarted.set(true);
    const bug = this.bugRef.nativeElement;

    // Ativa animação
    bug.style.animationPlayState = 'running';

    // Adiciona controles
    globalThis.document.addEventListener('keydown', this.jump);

    this.loopId = globalThis.setInterval(() => this.checkCollision(), 10);

    this.contId = globalThis.setInterval(() => {
      this.points.set(this.points() + 1);
    }, 100);

    // Aumenta velocidade a cada 2s
    this.speedIncreaseId = globalThis.setInterval(() => {
      this.animationDuration = Math.max(400, this.animationDuration - 100); // mínimo 400ms
      bug.style.animationDuration = `${this.animationDuration}ms`;
    }, 2000);

    // Troca a imagem do bug a cada 2s
    this.imageSwapId = globalThis.setInterval(() => {
      const bug = this.bugRef.nativeElement;

      this.currentBugImageIndex = (this.currentBugImageIndex + 1) % 3;

      bug.classList.remove('variant-0', 'variant-1', 'variant-2');
      bug.classList.add(`variant-${this.currentBugImageIndex}`);
    }, 2000);

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
      // Colisão
      bug.style.animationPlayState = 'paused';
      bug.style.left = `${bugPosition}px`;

      this.clearIntervals();
      globalThis.document.removeEventListener('keydown', this.jump);

      const finalScore = this.points();

      this.pointsFinal.set(finalScore);

      const userId = getUserIdFromToken();

      if (userId === undefined) {
        console.warn(
          'Usuário não logado, não foi possível atualizar os pontos.',
        );
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

  restart(): void {
    globalThis.location.reload();
  }

  goToRanking(): void {
    this.router.navigate(['/ranking']);
  }

  ngOnDestroy(): void {
    this.clearIntervals();
    globalThis.document.removeEventListener('keydown', this.jump);
  }

  clearIntervals(): void {
    clearInterval(this.loopId);
    clearInterval(this.contId);
    clearInterval(this.speedIncreaseId);
    clearInterval(this.imageSwapId);
  }
}
