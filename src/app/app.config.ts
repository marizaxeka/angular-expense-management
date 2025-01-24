import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { errorInterceptor } from './core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideAnimations(), provideHttpClient(),
    importProvidersFrom(MatIconRegistry),    provideNativeDateAdapter(),provideHttpClient(), provideHttpClient(
      withInterceptors([errorInterceptor])
    )
  ]
};
