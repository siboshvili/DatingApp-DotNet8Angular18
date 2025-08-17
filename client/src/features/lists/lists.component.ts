import {Component, inject, OnInit, signal} from '@angular/core';
import {LikesService} from '../../core/services/likes.service';
import {Member} from '../../types/member';
import {MemberCardComponent} from '../../features/members/member-card/member-card.component'
import {PaginatedResult} from '../../types/pagination';
import {PaginatorComponent} from "../../shared/paginator/paginator.component";

@Component({
    selector: 'app-lists',
    imports: [MemberCardComponent, PaginatorComponent],
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit {
    private likesService = inject(LikesService);
    protected paginatedResult = signal<PaginatedResult<Member> | null>(null);
    protected members = signal<Member[]>([]);
    protected predicate = 'liked';
    protected pageNumber = 1;
    protected pageSize = 5;

    tabs = [
        {label: 'Liked', value: 'liked'},
        {label: 'Liked me', value: 'likedBy'},
        {label: 'Mutual', value: 'mutual'},
    ]

    ngOnInit(): void {
        this.loadLikes();
    }

    setPredicate(predicate: string) {
        if (this.predicate !== predicate) {
            this.predicate = predicate;
            this.pageNumber = 1;
            this.loadLikes()
        }
    }

    loadLikes() {
        this.likesService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
            next: response => this.paginatedResult.set(response)
        })
    }

    onPageChange(event: { pageNumber: number, pageSize: number }) {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageNumber;
        this.loadLikes();
    }
}
