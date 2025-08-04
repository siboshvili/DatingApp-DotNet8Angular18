import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AccountService} from '../../core/services/account.service';
import {ToastService} from '../../core/services/toast.service';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { themes } from '../theme';
import {BusyService} from '../../core/services/busy.service';


@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [FormsModule, RouterLink, RouterModule],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
    protected accountService = inject(AccountService);
    protected busyService = inject(BusyService);
    private router = inject(Router);
    private toastService = inject(ToastService);
    protected creds: any = {}
    protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
    protected themes = themes;

    ngOnInit(): void {
        document.documentElement.setAttribute('data-theme', this.selectedTheme());
    }

    handleSelectTheme(theme: string) {
        this.selectedTheme.set(theme);
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        const elem = document.activeElement as HTMLDivElement;
        if (elem) elem.blur();
    }

    login() {
        this.accountService.login(this.creds).subscribe({
            next: () => {
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
