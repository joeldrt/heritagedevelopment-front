import { Routes } from '@angular/router';

import { InmueblesComponent } from './inmuebles/inmuebles.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
// import { ContactoComponent } from './contacto/contacto.component';
// import { AdquirirComponent } from './contacto/adquirir/adquirir.component';
import { OfertarComponent } from './contacto/ofertar/ofertar.component';
import { LoginComponent } from './login/login.component';
import { InmueblesResultadoComponent } from './inmuebles-resultado/inmuebles-resultado.component';
import { ClientGuardService } from '../services/guard/client-guard.service';
import { ClientComponent } from './client/client/client.component';

export const PAGES_ROUTES: Routes = [
  { path: '', redirectTo: 'inmuebles', pathMatch: 'full' },
  { path: 'inmuebles', component: InmueblesComponent },
  { path: 'inmuebles/resultados', component: InmueblesResultadoComponent},
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: OfertarComponent },
  // { path: 'contacto', component: ContactoComponent },
  // { path: 'contacto/adquirir', component: AdquirirComponent },
  // { path: 'contacto/ofertar', component: OfertarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clients', canActivate: [ClientGuardService], component: ClientComponent },
];
