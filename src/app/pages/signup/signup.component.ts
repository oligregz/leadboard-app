import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputConfigModel } from '@core/models';
import { UserService } from '@core/services/user.service';
import { InputTextComponent } from '@shared/components/forms/input-text/input-text.component';

export interface SignupForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  telefone: FormControl<string>;
  username: FormControl<string>;
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
  private readonly router = inject(Router);

  public selectedFile?: File;

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
        id: 'username',
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
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  public submit(): void {
    if (this.signupForm.valid) {
      const formData = new FormData();
      const formValue = this.signupForm.getRawValue();
      
      for (const [key, value] of Object.entries(formValue)) {
        formData.append(key, value);
      }

      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile);
      }
      formData.append('points', '0');

      this.signupService.signup(formData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
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
