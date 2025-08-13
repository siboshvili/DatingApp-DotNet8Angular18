import {Component, computed, inject, input} from '@angular/core';
import {Member} from '../../../types/member';
import {RouterLink} from "@angular/router";
import {AgePipe} from '../../../core/pipes/age.pipe';
import { LikesService } from '../../../core/services/likes.service';

@Component({
    selector: 'app-member-card',
    imports: [RouterLink, AgePipe],
    templateUrl: './member-card.component.html',
    styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
    private likeService = inject(LikesService);
    member = input.required<Member>();
    protected hasLiked = computed(() => this.likeService.likeIds().includes(this.member().id))
}
