import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputConfigModel } from '@core/models';
import { UserModel } from '@core/models/user.model';
import { UserService } from '@core/services/user.service';
import { InputTextComponent } from '@shared/components/forms/input-text/input-text.component';


export interface SignupForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  telefone: FormControl<string>;
  nomeUsuario: FormControl<string>;
}

@Component({
  selector: 'app-signup',
  imports: [InputTextComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly signupService = inject(UserService);

  public readonly inputConfigs: InputConfigModel[] = [
    {
      type: 'text',
      inputCommon: {
        id: 'name',
        label: 'Nome completo',
        hint: 'Digite seu nome completo',
      },
      validators: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Nome é obrigatório',
        },
      ],
      config: {
        type: 'text',
        maxLength: 100,
      },
    },
    {
      type: 'text',
      inputCommon: {
        id: 'email',
        label: 'Email',
        hint: 'email@email.com',
      },
      validators: [
        {
          name: 'required',
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
        hint: 'Mínimo 8 caracteres',
      },
      validators: [
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
      },
    },
    {
      type: 'text',
      inputCommon: {
        id: 'telefone',
        label: 'Telefone',
        hint: 'Digite seu número com DDD',
      },
      validators: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Telefone é obrigatório',
        },
      ],
      config: {
        type: 'text',
        maxLength: 15,
      },
    },
    {
      type: 'text',
      inputCommon: {
        id: 'nomeUsuario',
        label: 'Nome de usuário',
        hint: 'Escolha um nome de usuário',
      },
      validators: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Nome de usuário é obrigatório',
        },
      ],
      config: {
        type: 'text',
      },
    },
  ];

  public readonly signupForm = this.formBuilder.group<SignupForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ],
    }),
    telefone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    nomeUsuario: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public submit(): void {
    if (this.signupForm.valid) {
      const user: UserModel = this.signupForm.getRawValue();

      this.signupService.signup(user).subscribe({
        next: (response) => {
          console.log('Usuário cadastrado com sucesso:', response);
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário:', error);
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
