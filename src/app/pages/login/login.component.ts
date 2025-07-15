import { Component, inject, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InputConfigModel } from '@core/models';
import { LoginModel } from '@core/models/login.model';
import { LoginService } from '@core/services/auth.service';
import { setLocalStorageKeyValue } from '@pages/utils/manage-local-storage.util';
import { InputTextComponent } from '@shared/components/forms/input-text/input-text.component';
import { GenericDialogComponent } from '@shared/components/generic-dialog/generic-dialog.component';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextComponent, ReactiveFormsModule, GenericDialogComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(LoginService);
  private readonly router = inject(Router);

  showDialog = signal(false);
  dialogTitle = signal('');
  dialogContent = signal('');

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
    if (this.loginForm.valid) {
      const login: LoginModel = this.loginForm.getRawValue();

      this.authService.login(login).subscribe({
        next: (response) => {
          if (response.access_token) {
            setLocalStorageKeyValue('access_token', response.access_token);
            setLocalStorageKeyValue('logged_user_email', login.email);
            this.router.navigate(['/ranking']);
          }
        },
        error: (error) => {
          if (error?.error?.statusCode === 403) {
            this.dialogTitle.set('Erro no Login');
            this.dialogContent.set(error?.error?.message ?? 'Erro inesperado ao fazer login');
            this.showDialog.set(true);

            return;
          }
          
          if (error?.error?.statusCode === 500) {
            this.dialogTitle.set('Erro no Login');
            this.dialogContent.set('Erro inesperado ao fazer login. Tente novamente mais tarde.');
            this.showDialog.set(true);

            return;
          }

          this.loginForm.controls.password.setErrors({ auth: 'Email ou senha incorretos' });
          this.loginForm.controls.password.markAsTouched();
          this.loginForm.controls.email.setErrors({ auth: 'Email ou senha incorretos' });
          this.loginForm.controls.email.markAsTouched();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public redirectToSignup(): void {
    this.router.navigate(['/signup']);
  }

  onDialogClose(): void {
    this.showDialog.set(false);
  }
}
