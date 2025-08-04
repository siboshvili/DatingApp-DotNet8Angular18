import {Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {EditableMember, Member} from '../../../types/member';
import {DatePipe} from "@angular/common";
import { MemberService } from '../../../core/services/member.service';
import {FormsModule, NgForm} from "@angular/forms";
import {ToastService} from '../../../core/services/toast.service'
import {AccountService} from '../../../core/services/account.service';

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
    private accountService = inject(AccountService);
    protected memberService = inject(MemberService);
    private toast = inject(ToastService);
    protected editableMember: EditableMember = {
        displayName: '',
        description: '',
        city: '',
        country: ''
    };

    ngOnInit(): void {
        this.editableMember = {
            displayName: this.memberService.member()?.displayName || '',
            description: this.memberService.member()?.description,
            city: this.memberService.member()?.city || '',
            country: this.memberService.member()?.country || ''
        }
    }

    ngOnDestroy(): void {
        if(this.memberService.editMode()) {
            this.memberService.editMode.set(false);
        }
    }
    
    updateProfile() {
        if(!this.memberService.member()) return;
        const updatedMemeber = {...this.memberService.member(), ...this.editableMember};
        this.memberService.updateMember(this.editableMember).subscribe({
            next: () => {
                const currentUser = this.accountService.currentUser();
                if (currentUser && updatedMemeber.displayName !== currentUser?.displayName){
                    currentUser.displayName = updatedMemeber.displayName;
                    this.accountService.setCurrentUser(currentUser);
                }
                this.toast.success('Profile updated successfully');
                this.memberService.editMode.set(false);
                this.memberService.member.set(updatedMemeber as Member);
                this.editForm?.reset(updatedMemeber);
            }
        });
    }
}
