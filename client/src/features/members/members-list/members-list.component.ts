import {Component, inject, OnInit, signal} from '@angular/core';
import {MemberService} from '../../../core/services/member.service';
import {Observable} from "rxjs";
import {Member} from '../../../types/member';
import {AsyncPipe} from "@angular/common";
import {MemberCardComponent} from '../member-card/member-card.component';
import {PaginatedResult} from '../../../types/pagination';
import {PaginatorComponent} from '../../../shared/paginator/paginator.component';

@Component({
    selector: 'app-members-list',
    imports: [AsyncPipe, MemberCardComponent, PaginatorComponent],
    templateUrl:  './members-list.component.html',
    styleUrl: './members-list.component.css'
})
export class MembersListComponent implements OnInit {
    private memberService = inject(MemberService);
    protected paginatedMembers = signal<PaginatedResult<Member> | null>(null);
    pageNumber = 1;
    pageSize = 5;
    
    ngOnInit(): void {
        this.loadMembers()
    }

    loadMembers() {
        this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
            next: result => {
                this.paginatedMembers.set(result)
            }
        })
    }

    onPageChange(event: {pageNumber: number, pageSize: number}) {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageNumber;
        this.loadMembers();
    }
}
