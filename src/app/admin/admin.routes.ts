import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { PropertyUsersComponent } from './property-users/property-users.component';
import { ProfileComponent } from './profile/profile.component';

// seccion inmuebles
import { EstateComponent } from './estate/estate.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { WizardAltaPropiedadComponent } from '../common/wizard-alta-propiedad/wizard-alta-propiedad.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'admin', redirectTo: '/admin/estate', pathMatch: 'full' },
  { path: 'admin/dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
  { path: 'admin/admin-users', component: AdminUsersComponent, data: { title: '' }},
  { path: 'admin/property-users', component: PropertyUsersComponent, data: { title: '' }},
  { path: 'admin/estate', component: EstateComponent, data: { title: 'Propiedades' }},
  { path: 'admin/estate/:property_id', component: PropertyDetailComponent, data: { title: 'Propiedad - Detalle'}},
  { path: 'admin/profile', component: ProfileComponent, data: { title: 'Perfil' }},
  { path: 'admin/agregar/propiedad', component: WizardAltaPropiedadComponent, data: { title: 'Alta de Propiedad'}},
  { path: 'admin/estate/:property_id/edit', component: WizardAltaPropiedadComponent, data: { title: 'Edición de Propiedad'}}
];
