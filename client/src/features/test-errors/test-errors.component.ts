import {HttpClient} from '@angular/common/http';
import {Component, inject, signal} from '@angular/core';


@Component({
    selector: 'app-test-errors',
    imports: [],
    templateUrl: './test-errors.component.html',
    styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
    private http = inject(HttpClient);
    baseUrl = 'https://localhost:5001/api/';
    validationErrors = signal<string[]>([]);

    get404Error() {
        this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
            next: (response: any) => console.log(response),
            error: (error: any) => console.log(error)
        })
    }

    get400Error() {
        this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
            next: (response: any) => console.log(response),
            error: (error: any) => console.log(error)
        })
    }

    get500Error() {
        this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
            next: (response: any) => console.log(response),
            error: (error: any) => console.log(error)
        })
    }

    get401Error() {
        this.http.get(this.baseUrl + 'buggy/auth').subscribe({
            next: (response: any) => console.log(response),
            error: (error: any) => console.log(error)
        })
    }

    get400ValidationError() {
        this.http.post(this.baseUrl + 'account/register', {}).subscribe({
            next: (response: any) => console.log(response),
            error: (error: any) => {
                console.log(error)
                this.validationErrors.set(error);
            }
        })
    }

}
