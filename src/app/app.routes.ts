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
      {
        path: 'game',
        title: 'Game',
        loadComponent: async () =>
          import('./shared/components/game/game.component').then(
            (c) => c.GameComponent).catch((error) => {
            console.error('Erro ao carregar Gamecomponent:', error);
            throw error;
          }),
      },
    ],
  },
];
