import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Member} from "../../types/member";
import {AccountService} from "./account.service";

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private http = inject(HttpClient);
    private accountService = inject(AccountService);
    private baseUrl = environment.apiUrl + '/members/';

    getMembers() {
        return this.http.get<Member[]>(this.baseUrl, this.getHttpOptions());
    }

    getMember(id: string) {
        return this.http.get<Member>(this.baseUrl + '/' + id, this.getHttpOptions());
    }

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.accountService.currentUser()?.token
            })
        }
    }

}
