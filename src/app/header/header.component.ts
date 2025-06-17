import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import {
  getLocalStorageKeyValuye,
  removeLocalStorageKeyValuye,
} from '@pages/utils/manage-local-storage.util';

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
    const hasAccessToken = getLocalStorageKeyValuye('access_token') !== null;

    this.showLogoutButton = isRankingPage && hasAccessToken;
  }

  onLogout(): void {
    removeLocalStorageKeyValuye('access_token');
    removeLocalStorageKeyValuye('logged_user_email');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.routerEventsSub) {
      this.routerEventsSub.unsubscribe();
    }
  }
}
