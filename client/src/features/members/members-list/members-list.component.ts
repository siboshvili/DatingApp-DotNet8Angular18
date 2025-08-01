import {Component, inject} from '@angular/core';
import {MemberService} from '../../../core/services/member.service';
import {Observable} from "rxjs";
import {Member} from '../../../types/member';
import {AsyncPipe} from "@angular/common";
import {MemberCardComponent} from '../member-card/member-card.component';

@Component({
    selector: 'app-members-list',
    imports: [AsyncPipe, MemberCardComponent],
    templateUrl: './members-list.component.html',
    styleUrl: './members-list.component.css'
})
export class MembersListComponent {
    private memberService = inject(MemberService);
    protected members$: Observable<Member[]>;
    
    constructor() {
        this.members$ = this.memberService.getMembers();
    }


}
