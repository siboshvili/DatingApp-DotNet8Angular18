import {Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EditableMember, Member} from '../../../types/member';
import {DatePipe} from "@angular/common";
import { MemberService } from '../../../core/services/member.service';
import {FormsModule, NgForm} from "@angular/forms";
import {ToastService} from '../../../core/services/toast.service';

@Component({
    selector: 'app-member-profile',
    imports: [DatePipe, FormsModule],
    templateUrl: './member-profile.component.html',
    styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit, OnDestroy {
    @ViewChild('editForm') editForm?: NgForm;
    @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
        if (this.editForm?.dirty) {
            $event.preventDefault()
        }
    }
    protected memberService = inject(MemberService);
    private toast = inject(ToastService);
    private route = inject(ActivatedRoute);
    protected member = signal<Member | undefined>(undefined);
    protected editableMember: EditableMember = {
        displayName: '',
        description: '',
        city: '',
        country: ''
    };

    ngOnInit(): void {
        this.route.parent?.data.subscribe(data => {
            this.member.set(data['member']);
        });
        this.editableMember = {
            displayName: this.member()?.displayName || '',
            description: this.member()?.description,
            city: this.member()?.city || '',
            country: this.member()?.country || ''
        }
    }

    ngOnDestroy(): void {
        if(this.memberService.editMode()) {
            this.memberService.editMode.set(false);
        }
    }
    
    updateProfile() {
        if(!this.member()) return;
        const updatedMemeber = {...this.member(), ...this.editableMember};
        console.log(updatedMemeber)
        this.toast.success('Profile updated successfully');
        this.memberService.editMode.set(false);
    }
}
