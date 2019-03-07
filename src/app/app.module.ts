import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Forms module
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
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
    EstateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
