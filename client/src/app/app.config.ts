import {ApplicationConfig, provideAppInitializer, inject, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http'
import {InitService} from '../core/services/init.service';
import {lastValueFrom} from 'rxjs';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes, withViewTransitions()),
        provideHttpClient(),
        provideAppInitializer(async () => {
            const initService = inject(InitService);

            return new Promise<void>((resolve) => {
                setTimeout(async () => {
                    try {
                        return lastValueFrom(initService.init())
                    } finally {
                        const splash = document.getElementById('initial-splash');
                        if (splash) {
                            splash.remove();
                        }
                        resolve();
                    }
                }, 500)
            })
        })
    ]
};
