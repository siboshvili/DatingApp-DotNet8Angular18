import {Component, inject} from '@angular/core';
import {NavComponent} from '../layout/nav/nav.component';
import {Router, RouterOutlet} from '@angular/router';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-root',
    imports: [NavComponent, RouterOutlet, ConfirmDialogComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    protected router = inject(Router);
}
