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
          message: 'MC Pipoquinha',
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
      config: {
        type: 'password',
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
      validators: [Validators.required],
    }),
  });

  public submit(): void {
    console.log(this.loginForm.controls.email.value);
  }
}
