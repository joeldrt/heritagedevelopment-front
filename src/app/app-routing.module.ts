import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthadminService } from './services/authentication/authadmin.service';

import { AdminComponent } from './admin/admin.component';
import { ADMIN_ROUTES } from './admin/admin.routes';
import { PagesComponent } from './pages/pages.component';
import { PAGES_ROUTES } from './pages/pages.routes';

const routes: Routes = [
  { path: '',   redirectTo: '/inmuebles', pathMatch: 'full' },
  { path: '', component: AdminComponent, canActivate: [AuthadminService], children: ADMIN_ROUTES },
  { path: '', component: PagesComponent, children: PAGES_ROUTES},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
