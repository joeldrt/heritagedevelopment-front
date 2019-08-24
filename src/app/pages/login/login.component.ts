import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from '../../services/toastr/toastr.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  mensajeLoading = '';

  public email: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
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
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/admin']);
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        this.toastr.error(error.message, 'Error');
        this.loading = false;
      }
    );
    // this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(
    //   (credentials) => {
    //     this.router.navigate(['/admin']);
    //     this.loading = false;
    //   },
    //   (error) => {
    //     this.loading = false;
    //     this.toastr.error(error.message, 'Error');
    //     this.loading = false;
    //   }
    // );
  }

}
