import { ApplicationConfig, Injectable, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { provideRouter, RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routerTitle = this.buildTitle(snapshot);

    let title = 'Leaderboard';

    title = routerTitle === undefined ? title : `${title} | ${routerTitle}`;
    this.title.setTitle(title);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
  ],
};
