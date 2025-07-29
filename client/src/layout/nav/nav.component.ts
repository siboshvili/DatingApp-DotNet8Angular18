import { Component, inject, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { ToastService } from '../../core/services/toast.service';
import {Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  protected creds: any = {}

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        this.router.navigateByUrl('/members');
        this.toastService.success('Login successful');
        this.creds = {};
      },
      error: error => {
        this.toastService.error(error.error);
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
