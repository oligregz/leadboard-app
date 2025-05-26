import { Component, computed, effect, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { InputCommonDirective } from '../input-common.directive';
import { InputErrorMessageComponent } from '../input-error-message/input-error-message.component';


@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule, InputErrorMessageComponent, FontAwesomeModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent extends InputCommonDirective {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  public type = signal('text');
  
  public isPassword = computed(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => this.inputConfig().config.type === 'password',
  );

  constructor() {
    super();

    effect(() => {
      this.type.set(this.inputConfig().config.type);
    });
  }

  public togglePasswordVisibility(): void {
    this.type.set(this.type() === 'password' ? 'text' : 'password');
  }
}
