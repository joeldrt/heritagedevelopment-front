import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InmueblesComponent } from './pages/inmuebles/inmuebles.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

const routes: Routes = [
  { path: '',   redirectTo: '/inmuebles', pathMatch: 'full' },
  { path: 'inmuebles', component: InmueblesComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactoComponent }
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
