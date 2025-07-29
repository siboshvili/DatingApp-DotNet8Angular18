import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { MembersListComponent } from '../features/members/members-list/members-list.component';
import {MemberDetailedComponent} from '../features/members/member-detailed/member-detailed.component';
import { ListsComponent } from '../features/lists/lists.component';
import { MessagesComponent } from '../features/messages/messages.component';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'members', component: MembersListComponent, canActivate: [authGuard]},
  {path: 'members/:id', component: MemberDetailedComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'messages', component: MessagesComponent},
  {path: '**', component: HomeComponent}
];
