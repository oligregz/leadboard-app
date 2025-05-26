import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputConfigModel } from '@core/models';
import { InputTextComponent } from '@shared/components/forms/input-text/input-text.component';


interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [InputTextComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  public readonly inputConfigs: InputConfigModel[] = [
    {
      type: 'text',
      inputCommon: {
        id: 'email',
        label: 'Email',
        hint: 'email@email.com',
      },
      validators: [
        {
          name: 'email',
          validator: Validators.email,
          message: 'Digite um email válido',
        },
      ],
      config: {
        type: 'text',
      },
    },
    {
      type: 'text',
      inputCommon: {
        id: 'password',
        label: 'Senha',
        hint: '',
      },
      validators: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Senha obrigatória',
        },
        {
          name: 'minlength',
          validator: Validators.minLength(8),
          message: 'A senha precisa ter no mínimo 8 caracteres.',
        },
        {
          name: 'maxlength',
          validator: Validators.maxLength(20),
          message: 'A senha precisa ter no máximo 20 caracteres.',
        },
      ],
      config: {
        type: 'password',
        maxLength: 20,
        minLength: 8,
      },
    },
  ];

  public loginForm = this.formBuilder.group<LoginForm>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ],
    }),
  });

  public submit(): void {
    console.log(this.loginForm.controls.email.value);
    console.log(this.loginForm.controls.password.value);
  }
}
