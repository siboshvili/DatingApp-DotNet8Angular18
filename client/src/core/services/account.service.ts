import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {RegisterCreds, User, LoginCreds} from '../../types/user';
import {tap} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {LikesService} from './likes.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private http = inject(HttpClient);
    private likesService = inject(LikesService);
    currentUser = signal<User | null>(null);
    private baseUrl = environment.apiUrl;

    register(creds: RegisterCreds) {
        return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
            tap(user => {
                if (user) {
                    this.setCurrentUser(user);
                }
            })
        )
    }

    login(creds: LoginCreds) {
        return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
            tap(user => {
                if (user) {
                    this.setCurrentUser(user);
                }
            })
        );
    }

    setCurrentUser(user: User) {
        user.roles = this.getRolesFromToken(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
        this.likesService.getLikeIds();
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('filters');
        this.likesService.clearLikdeIds();
        this.currentUser.set(null);
    }

    private getRolesFromToken(user: User): string[] {
        const payload = user.token.split('.')[1];
        const decoded = atob(payload)
        const jsonPayload = JSON.parse(decoded);
        return Array.isArray(jsonPayload.role) ? jsonPayload.role : [jsonPayload.role]
    }
}
