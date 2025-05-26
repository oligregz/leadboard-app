import { ValidatorFn } from '@angular/forms';


export interface InputConfigModel {
  type: 'text';
  inputCommon: InputCommonModel;
  validators?: ValidatorModel[];
  prioritize?: string[];
  config: InputTextModel;
}

export interface InputCommonModel {
  id: string;
  label: string;
  hint: string;
  groupName?: string;
}

export interface InputTextModel {
  type: 'text' | 'password' | 'number';
  upperCase?: boolean;
  maxLength?: number | string;
  minLength?: number | string;
}

export interface ValidatorModel {
  name: string;
  validator: ValidatorFn;
  message?: string;
}
