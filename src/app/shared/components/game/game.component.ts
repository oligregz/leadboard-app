import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';


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

  private loopId?: ReturnType<typeof setInterval>;
  private contadorId?: ReturnType<typeof setInterval>;

  pontos = signal(0);
  pontosFinal = signal(0);

  restart(): void {
    globalThis.location.reload();
  }

  ngAfterViewInit(): void {
    globalThis.document.addEventListener('keydown', this.jump);

    this.loopId = globalThis.setInterval(() => this.checkCollision(), 10);
    this.contadorId = globalThis.setInterval(() => {
      this.pontos.set(this.pontos() + 1);
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
      clearInterval(this.contadorId);
      globalThis.document.removeEventListener('keydown', this.jump);

      this.pontosFinal.set(this.pontos());
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.loopId);
    clearInterval(this.contadorId);
    globalThis.document.removeEventListener('keydown', this.jump);
  }
}
