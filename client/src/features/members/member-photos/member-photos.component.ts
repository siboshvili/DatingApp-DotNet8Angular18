import {Component, inject, signal, OnInit} from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import {ActivatedRoute} from "@angular/router";
import { Photo } from '../../../types/member';
import {AsyncPipe} from "@angular/common";
import { ImageUploadComponent } from '../../../shared/image-upload/image-upload.component';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUploadComponent],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css'
})
export class MemberPhotosComponent implements OnInit {
  protected memberService = inject(MemberService);
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
}
