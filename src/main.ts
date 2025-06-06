// <reference types="@angular/localize" />

import { provideHttpClient } from '@angular/common/http';
/* eslint-disable unicorn/prefer-top-level-await */
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideHttpClient(), ...(appConfig.providers ?? [])],
}).catch((error) => console.error(error));
