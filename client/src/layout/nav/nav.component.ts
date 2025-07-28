import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private accountService = inject(AccountService);
  protected creds: any = {}

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result =>console.log(result),
      error: error => console.log(error)
    });
  }


}
