import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from '../../services/toastr/toastr.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private adminArray: Array<string> = ['root', 'superuser', 'administrator', 'hdadministrator'];

  user: any;

  loading = false;
  mensajeLoading = '';

  public email: string;
  public password: string;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.user = this.storageService.getUser();
    if (!this.user || !this.user.role || !this.user.role.type) {
      return;
    }
    if (this.adminArray.indexOf(this.user.role.type) < 0) {
      this.router.navigate(['/clients']);
    } else {
      this.router.navigate(['/admin']);
    }
  }

  login() {
    if (!this.email || !this.password) {
      this.toastr.error('Nombre de usuario o contraseña inválidos', 'Error');
      return;
    }
    this.loading = true;
    this.mensajeLoading = 'Ingresando...';
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        this.loading = false;
        this.user = response.user;
        if (!this.user || !this.user.role || !this.user.role.type) {
          return;
        }
        if (this.adminArray.indexOf(this.user.role.type) >= 0) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/clients']);
        }
      },
      (error: any) => {
        this.loading = false;
        this.toastr.error(error.message, 'Error');
        this.loading = false;
      }
    );
  }

}
