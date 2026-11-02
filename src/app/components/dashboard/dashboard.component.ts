import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-dashboard',
    imports: [],
    templateUrl: './dashboard.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}

