import {Component, inject} from '@angular/core';
import {MemberService} from '../../../core/services/member.service';
import {Observable} from "rxjs";
import {Member} from '../../../types/member';
import {AsyncPipe} from "@angular/common";
import {MemberCardComponent} from '../member-card/member-card.component';
import {PaginatedResult} from '../../../types/pagination';

@Component({
    selector: 'app-members-list',
    imports: [AsyncPipe, MemberCardComponent],
    templateUrl:  './members-list.component.html',
    styleUrl: './members-list.component.css'
})
export class MembersListComponent {
    private memberService = inject(MemberService);
    protected paginatedMembers$: Observable<PaginatedResult<Member>>;
    
    constructor() {
        this.paginatedMembers$ = this.memberService.getMembers();
    }


}
