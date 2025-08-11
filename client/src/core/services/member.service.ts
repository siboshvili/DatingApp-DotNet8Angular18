import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Member, Photo} from "../../types/member";
import {EditableMember} from "../../types/member";
import {tap} from 'rxjs';
import {PaginatedResult} from "../../types/pagination";

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;
    editMode = signal(false);
    member = signal<Member | null>(null);

    getMembers(pageNumber = 1, pageSize = 10) {
        let params = new HttpParams();

        params = params.append('pageNumber', pageNumber);
        params = params.append('pageSize', pageSize);

        return this.http.get<PaginatedResult<Member>>(this.baseUrl + 'members/', {params});
    }

    getMember(id: string) {
        return this.http.get<Member>(this.baseUrl + 'members/' + id).pipe(
            tap(member => {
                this.member.set(member);
            })
        );
    }

    getMemberPhotos(id: string) {
        return this.http.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');
    }

    updateMember(member: EditableMember) {
        return this.http.put(this.baseUrl + 'members/', member);
    }

    uploadPhoto(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<Photo>(this.baseUrl + 'members/add-photo', formData);
    }

    setMainPhoto(photo: Photo) {
        return this.http.put(this.baseUrl + 'members/set-main-photo/' + photo.id, {});
    }

    deletePhoto(photoId: number) {
        return this.http.delete(this.baseUrl + 'members/delete-photo/' + photoId);
    }
}
