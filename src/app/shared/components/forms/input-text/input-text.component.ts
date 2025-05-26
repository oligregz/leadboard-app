import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputCommonDirective } from '../input-common.directive';
import { InputErrorMessageComponent } from '../input-error-message/input-error-message.component';


@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule, InputErrorMessageComponent],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent extends InputCommonDirective {
  showPassword = signal<boolean>(false);

  togglePasswordVisibility(state: boolean): void {
    this.showPassword.set(state);
  }
}
