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
    private updatedParams = new MemberParams();
    
    constructor() {
        const filters = localStorage.getItem('filters');
        if (filters) {
            this.memberParams = JSON.parse(filters);
            this.updatedParams = JSON.parse(filters)
        }
    }

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

    onClose() {
        console.log('Modal closed');
    }

    onFilterChange(data: MemberParams) {
        this.memberParams = data;
        this.updatedParams = data;
        this.loadMembers()
    }

    resetFilters() {
        this.memberParams = new MemberParams();
        this.loadMembers();
    }

    get displayMessage(): string {
        const defaultParams = new MemberParams();

        const filters: string[] = [];

        if (this.updatedParams.gender) {
            filters.push(this.updatedParams.gender + 's')
        } else {
            filters.push('Males, Females');
        }

        if (this.updatedParams.minAge !== defaultParams.minAge
            || this.updatedParams.maxAge !== defaultParams.maxAge) {
            filters.push(` ages ${this.updatedParams.minAge}-${this.updatedParams.maxAge}`)
        }

        filters.push(this.updatedParams.orderBy === 'lastActive'
            ? 'Recently active' : 'Newest members');

        return filters.length > 0 ? `Selected: ${filters.join('  | ')}` : 'All members'
    }
}
