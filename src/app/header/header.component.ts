import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter, Subscription } from 'rxjs';

import { getLocalStorageKeyValue, removeLocalStorageKeyValue } from '@pages/utils/manage-local-storage.util';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private routerEventsSub!: Subscription;
  private readonly router = inject(Router);
  showLogoutButton = false;

  ngOnInit(): void {
    this.checkLogoutVisibility(this.router.url);

    this.routerEventsSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkLogoutVisibility(event.urlAfterRedirects);
      });
  }

  checkLogoutVisibility(url: string): void {
    const isRankingPage = url.includes('ranking');
    const hasAccessToken = getLocalStorageKeyValue('access_token') !== null;

    this.showLogoutButton = isRankingPage && hasAccessToken;
  }

  onLogout(): void {
    removeLocalStorageKeyValue('access_token');
    removeLocalStorageKeyValue('logged_user_email');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.routerEventsSub) {
      this.routerEventsSub.unsubscribe();
    }
  }
}
