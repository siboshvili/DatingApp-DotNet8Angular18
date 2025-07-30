import {Routes} from '@angular/router';
import {HomeComponent} from '../features/home/home.component';
import {MembersListComponent} from '../features/members/members-list/members-list.component';
import {MemberDetailedComponent} from '../features/members/member-detailed/member-detailed.component';
import {ListsComponent} from '../features/lists/lists.component';
import {MessagesComponent} from '../features/messages/messages.component';
import {TestErrorsComponent} from '../features/test-errors/test-errors.component';
import {authGuard} from '../core/guards/auth.guard';
import {NotFoundComponent} from '../shared/errors/not-found/not-found.component';
import {ServerErrorComponent} from '../shared/errors/server-error/server-error.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'members', component: MembersListComponent},
            {path: 'members/:id', component: MemberDetailedComponent},
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent},
        ]
    },
    {path: 'errors', component: TestErrorsComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: '**', component: NotFoundComponent}
];
