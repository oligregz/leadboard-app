import { Routes } from '@angular/router';

import { UnloggedComponent } from '@pages/unlogged/unlogged.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: UnloggedComponent,
    children: [
      {
        path: '',
        title: 'Login',
        loadComponent: async () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'signin',
        title: 'Cadastro',
        loadComponent: async () =>
          import('./pages/signup/signup.component').then((c) => c.SignupComponent),
      },
    ],
  },
];
