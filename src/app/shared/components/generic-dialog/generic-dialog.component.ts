import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-dialog.component.html',
  styleUrl: './generic-dialog.component.scss'
})
export class GenericDialogComponent {
  isVisible = input(false);
  title = input('Modal title');
  content = input('');
  
  closed = output<void>();

  close() {
    this.closed.emit();
  }
}