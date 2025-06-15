import { Routes } from '@angular/router';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TimelineComponent } from './pages/timeline/timeline.component';

export const appRoutes: Routes = [  // ✅ Renamed to appRoutes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'add-event', component: AddEventComponent }
];

