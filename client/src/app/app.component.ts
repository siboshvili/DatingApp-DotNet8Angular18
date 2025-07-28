import {HttpClient} from '@angular/common/http';
import { Component, OnInit, inject, signal, } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NavComponent } from '../layout/nav/nav.component';
import { AccountService } from '../core/services/account.service';
import {HomeComponent } from '../features/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private accountService = inject(AccountService);
  private http = inject(HttpClient)
  protected title = 'Dating App';
  protected members = signal<any>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers())
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error){
      console.log(error)
      throw error;
    }
  }

}
