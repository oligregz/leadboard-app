import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { ValidatorModel } from '@core/models';
import { validationMsgs } from '@core/utils/string.utility';


@Pipe({
  name: 'errorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {

  transform(
    errors: ValidationErrors | null,
    validators: ValidatorModel[] | undefined,
    prioritize: string[] | undefined): string | undefined {

    const errorKeys = Object.keys(errors || {});

    if (errorKeys.length === 0) {
      return undefined;
    }

    let bestPriority = -1;
    let bestError = '';

    for (const key of errorKeys) {
      const priority = this.getPriority(prioritize, key);

      if (priority > bestPriority) {
        bestPriority = priority;
        bestError = key;
      }
    }

    if (validators) {
      const validador = validators.find(validator => validator.name === bestError);

      if (validador && validador.message) {
        return validador.message;
      }
    }

    return validationMsgs[bestError];
  }

  getPriority(prioritize: string[] = [], errorKey: string): number {
    const index = prioritize.indexOf(errorKey);

    if (index === -1) {
      return 0;
    }

    return prioritize.length - index;
  }

}
