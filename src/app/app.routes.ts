import { Routes } from '@angular/router';

import { UnloggedComponent } from '@pages/unlogged/unlogged.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UnloggedComponent,
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: async () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'signup',
        title: 'Signup',
        loadComponent: async () =>
          import('./pages/signup/signup.component').then(
            (c) => c.SignupComponent),
      },
      {
        path: 'ranking',
        title: 'Ranking',
        loadComponent: async () =>
          import('./pages/ranking/ranking.component').then(
            (c) => c.RankingComponent),
      },
    ],
  },
];
