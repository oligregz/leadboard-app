import { Directive, input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { InputConfigModel } from '@core/models';


@Directive()
export abstract class InputCommonDirective {
  public control = input.required<FormControl>();
  public inputConfig = input.required<InputConfigModel>();
}
