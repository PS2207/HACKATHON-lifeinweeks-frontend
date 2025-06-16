import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ use this instead of provideReactiveForms()

import { appRoutes } from './app.routes';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideAnimations(),
    importProvidersFrom(ReactiveFormsModule)  // fix for formGroup error
  ]
};




