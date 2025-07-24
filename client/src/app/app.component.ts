import {HttpClient} from '@angular/common/http';
import { Component, OnInit, inject, signal, } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private http = inject(HttpClient)
  protected title = 'Dating App';
  protected members = signal<any>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers())
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
