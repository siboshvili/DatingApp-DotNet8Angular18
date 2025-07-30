import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toast = inject(ToastService);

    return next(req).pipe(
        catchError(error => {
            switch (error.status) {
                case 400:
                    toast.error('Bad Request');
                    break;
                case 401:
                    toast.error('Unauthorized');
                    break;
                case 404:
                    toast.error('Not Found');
                    break;
                case 500:
                    toast.error('Server Error');
                    break;
                default:
                    toast.error('Unexpected Error');
            }
            return throwError(() => error);
        })
    );
};
