import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InmueblesComponent } from './pages/inmuebles/inmuebles.component';

const routes: Routes = [
  { path: '',   redirectTo: '/inmuebles', pathMatch: 'full' },
  { path: 'inmuebles', component: InmueblesComponent }
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
