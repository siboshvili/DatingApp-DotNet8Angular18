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
import {MemberProfileComponent} from '../features/members/member-profile/member-profile.component';
import {MemberPhotosComponent} from '../features/members/member-photos/member-photos.component';
import {MemberMessagesComponent} from '../features/members/member-messages/member-messages.component';
import {memberResolver} from '../features/members/member.resolver';
import {prevenetUnsavedChangesGuard} from '../core/guards/prevenet-unsaved-changes.guard';
import {AdminComponent} from '../features/admin/admin.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'members', component: MembersListComponent},
            {
                path: 'members/:id',
                resolve: {member: memberResolver},
                runGuardsAndResolvers: 'always',
                component: MemberDetailedComponent,
                children: [
                    {path: '', redirectTo: 'profile', pathMatch: 'full'},
                    {
                        path: 'profile', component: MemberProfileComponent, title: 'Profile',
                        canDeactivate: [prevenetUnsavedChangesGuard]
                    },
                    {path: 'photos', component: MemberPhotosComponent, title: 'Photos'},
                    {path: 'messages', component: MemberMessagesComponent, title: 'Messages'},
                ]
            },
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent},
            {path: 'admin', component: AdminComponent},
        ]
    },
    {path: 'errors', component: TestErrorsComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: '**', component: NotFoundComponent}
];
