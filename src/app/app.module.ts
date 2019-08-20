import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Taginput
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Forms module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// core view
import { AppComponent } from './app.component';

// 2nd level views
import { AdminComponent } from './admin/admin.component';
import { PagesComponent } from './pages/pages.component';

// layout components
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

// public pages
import { InmueblesComponent } from './pages/inmuebles/inmuebles.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdquirirComponent } from './pages/contacto/adquirir/adquirir.component';
import { OfertarComponent } from './pages/contacto/ofertar/ofertar.component';
import { LoginComponent } from './pages/login/login.component';

// admin pages
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AdminNavbarComponent } from './layout/admin-navbar/admin-navbar.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { PropertyUsersComponent } from './admin/property-users/property-users.component';
import { EstateComponent } from './admin/estate/estate.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { WizardAltaPropiedadComponent } from './common/wizard-alta-propiedad/wizard-alta-propiedad.component';
import { LoadingComponent } from './common/loading/loading.component';
import { PropertyDetailComponent } from './admin/property-detail/property-detail.component';
import { PropertyDisplayComponent } from './common/property-display/property-display.component';
import { GooglePlacesComponent } from './common/google-places/google-places.component';
import { InmueblesResultadoComponent } from './pages/inmuebles-resultado/inmuebles-resultado.component';
import { FiltroPrecioComponent } from './pages/inmuebles-resultado/filtro-precio/filtro-precio.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { FiltroRentaVentaComponent } from './pages/inmuebles-resultado/filtro-renta-venta/filtro-renta-venta.component';
import { FiltroTipoPropiedadComponent } from './pages/inmuebles-resultado/filtro-tipo-propiedad/filtro-tipo-propiedad.component';
import { FiltroMasComponent } from './pages/inmuebles-resultado/filtro-mas/filtro-mas.component';
import { FiltroAmenidadesComponent } from './pages/inmuebles-resultado/filtro-amenidades/filtro-amenidades.component';
import { DetalleInmuebleComponent } from './pages/inmuebles-resultado/detalle-inmueble/detalle-inmueble.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PagesComponent,
    NavbarComponent,
    FooterComponent,
    InmueblesComponent,
    NosotrosComponent,
    ContactoComponent,
    AdquirirComponent,
    OfertarComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    AdminNavbarComponent,
    AdminUsersComponent,
    PropertyUsersComponent,
    EstateComponent,
    ProfileComponent,
    WizardAltaPropiedadComponent,
    LoadingComponent,
    PropertyDetailComponent,
    PropertyDisplayComponent,
    GooglePlacesComponent,
    InmueblesResultadoComponent,
    FiltroPrecioComponent,
    ClickStopPropagationDirective,
    FiltroRentaVentaComponent,
    FiltroTipoPropiedadComponent,
    FiltroMasComponent,
    FiltroAmenidadesComponent,
    DetalleInmuebleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    TagInputModule
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: StorageBucket, useValue: 'heritagedevelopment-18797.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
