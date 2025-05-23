import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ValidatorModel } from '@core/models';
import { ErrorMessagePipe } from '@pipes';


@Component({
  selector: 'app-input-error-message',
  imports: [ErrorMessagePipe],
  templateUrl: './input-error-message.component.html',
  styleUrl: './input-error-message.component.scss',
})
export class InputErrorMessageComponent {
  public control = input.required<FormControl>();
  public validators = input<ValidatorModel[]>();
  public prioritize = input<string[]>();
}
