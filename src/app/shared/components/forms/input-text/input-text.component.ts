import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputCommonDirective } from '../input-common.directive';
import { InputErrorMessageComponent } from '../input-error-message/input-error-message.component';


@Component({
  selector: 'app-input-text',
  imports: [InputErrorMessageComponent, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent extends InputCommonDirective {}
