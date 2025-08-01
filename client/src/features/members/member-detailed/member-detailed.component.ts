import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {filter} from "rxjs";
import { Member } from '../../../types/member';

@Component({
    selector: 'app-member-detailed',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: './member-detailed.component.html',
    styleUrl: './member-detailed.component.css'
})
export class MemberDetailedComponent implements OnInit{
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    protected member = signal<Member | undefined>(undefined)
    protected title = signal<string | undefined>('Profile');

    ngOnInit(): void {
        this.route.data.subscribe({
            next: data => this.member.set(data['member'])
        });
        this.title.set(this.route.firstChild?.snapshot?.title);
        
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe({
            next: () => {
                this.title.set(this.route.firstChild?.snapshot?.title);
            }
        })
    }
}
