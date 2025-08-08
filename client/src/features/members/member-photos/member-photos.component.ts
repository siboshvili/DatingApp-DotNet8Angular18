import {Component, inject, signal, OnInit} from '@angular/core';
import {MemberService} from '../../../core/services/member.service';
import {ActivatedRoute} from "@angular/router";
import {Member, Photo} from '../../../types/member';
import {ImageUploadComponent} from '../../../shared/image-upload/image-upload.component';
import {AccountService} from '../../../core/services/account.service';
import {User} from '../../../types/user';

@Component({
    selector: 'app-member-photos',
    imports: [ImageUploadComponent],
    templateUrl: './member-photos.component.html',
    styleUrl: './member-photos.component.css'
})
export class MemberPhotosComponent implements OnInit {
    protected memberService = inject(MemberService);
    private accountService = inject(AccountService);
    private route = inject(ActivatedRoute);
    protected photos = signal<Photo[]>([]);
    protected loading = signal(false);

    ngOnInit(): void {
        const memberId = this.route.parent?.snapshot.params['id'];
        if (memberId) {
            this.memberService.getMemberPhotos(memberId).subscribe({
                next: photos => this.photos.set(photos)
            });
        }
    }

    onUploadImage(file: File): void {
        this.loading.set(true);
        this.memberService.uploadPhoto(file).subscribe({
            next: photo => {
                this.memberService.editMode.set(false);
                this.loading.set(false);
                this.photos.update(photos => [...photos, photo]);
            },
            error: error => {
                console.log('Error uploading photo', error);
                this.loading.set(false);
            }
        });
    }

    setMainPhoto(photo: Photo): void {
        this.memberService.setMainPhoto(photo).subscribe({
            next: () => {
                const currentUser = this.accountService.currentUser();
                if (currentUser) currentUser.imageUrl = photo.url;
                this.accountService.setCurrentUser(currentUser as User);
                this.memberService.member.update(member => ({
                    ...
                        member,
                    imageUrl:
                    photo.url
                }) as Member);
            }
        })
    }
}
