import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { getLocalStorageKeyValuye } from '@pages/utils/manage-local-storage.util';
import { GenericDialogComponent } from '@shared/components/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-verification',
  imports: [GenericDialogComponent],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
})
export class VerificationComponent implements OnInit {
  private readonly authService = inject(AuthService);
  successStatus = signal(false);

  showDialog = signal(false);
  dialogTitle = signal('');
  dialogContent = signal('');

  log = signal('');

  catchCodeVerify(): string {
    const urlParameters = new URLSearchParams(globalThis.location.search);

    return urlParameters.get('codeVerify') || '';
  }

  verification(): void {
    const userEmail = getLocalStorageKeyValuye('logged_user_email') || 'user_not_found';
    const codeVerify = this.catchCodeVerify();

    if (!userEmail || !codeVerify) {
      this.dialogTitle.set('Falha na Verificação');
      this.dialogContent.set('Dados inválidos. Por favor, realize o login novamente e verifique-se.');
      this.showDialog.set(true);
    }
  
    this.authService.verification(codeVerify, userEmail).subscribe({
      next: (response) => {
        if(response) {
          this.successStatus.set(true);
        }
      },
      error: () => {
        this.dialogTitle.set('Falha na Verificação');
        this.dialogContent.set('Algo de errado aconteceu. Tente novamente mais tarde.');
        this.showDialog.set(true);
        console.error(this.dialogContent());
      },
    });
  }

  ngOnInit(): void {
    this.verification();
  }
}
