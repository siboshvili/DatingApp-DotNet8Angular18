import {Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {MemberService} from '../../../core/services/member.service';
import {Member, MemberParams} from '../../../types/member';
import {MemberCardComponent} from '../member-card/member-card.component';
import {PaginatedResult} from '../../../types/pagination';
import {PaginatorComponent} from '../../../shared/paginator/paginator.component';
import {FilterModalComponent} from '../filter-modal/filter-modal.component';

@Component({
    selector: 'app-members-list',
    imports: [MemberCardComponent, PaginatorComponent, FilterModalComponent],
    templateUrl: './members-list.component.html',
    styleUrl: './members-list.component.css'
})
export class MembersListComponent implements OnInit {
    @ViewChild('filterModal') modal!: FilterModalComponent;
    private memberService = inject(MemberService);
    protected paginatedMembers = signal<PaginatedResult<Member> | null>(null);
    memberParams = new MemberParams();

    ngOnInit(): void {
        this.loadMembers()
    }

    loadMembers() {
        this.memberService.getMembers(this.memberParams).subscribe({
            next: result => {
                this.paginatedMembers.set(result)
            }
        })
    }

    onPageChange(event: { pageNumber: number, pageSize: number }) {
        this.memberParams.pageSize = event.pageSize;
        this.memberParams.pageNumber = event.pageNumber;
        this.loadMembers();
    }

    openModal() {
        this.modal.open();
    }
    
    onClose(){
        console.log('Modal closed');
    }
    
    onFilterChange(data: MemberParams) {
        this.memberParams = data;
        this.loadMembers()
    }
    
    resetFilters(){
        this.memberParams = new MemberParams();
        this.loadMembers();
    }
}
