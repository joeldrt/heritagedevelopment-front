import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { PropertyUsersComponent } from './property-users/property-users.component';
import { EstateComponent } from './estate/estate.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/admin-users', component: AdminUsersComponent },
  { path: 'admin/property-users', component: PropertyUsersComponent },
  { path: 'admin/estate', component: EstateComponent },
];
