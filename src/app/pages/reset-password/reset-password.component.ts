import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgottenPasswordService } from 'src/app/services/forgotten-password/forgotten-password.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private adminArray: Array<string> = ['root', 'superuser', 'administrator', 'hdadministrator'];

  private code: string;
  password: string;
  passwordError = false;
  rePassword: string;
  rePasswordError = false;

  cargando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forgottenPasswordService: ForgottenPasswordService,
    private toastr: ToastrService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.code = params.code;
    });
  }

  ngOnInit() {
  }

  restablecerPassword() {
    this.passwordError = false;
    this.rePasswordError = false;
    const passwordRegEx = RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,9}');
    if (!passwordRegEx.test(this.password)) {
      this.passwordError = true;
      return;
    }
    if (this.password !== this.rePassword) {
      this.rePasswordError = true;
      return;
    }
    this.cargando = true;
    this.forgottenPasswordService.resetPassword(this.code, this.password).subscribe(
      (response: any) => {
        this.cargando = false;
        this.toastr.success('Contraseña restablecida', 'Éxito');
        if (!response.user || !response.user.role || !response.user.role.type) {
          return;
        }
        if (this.adminArray.indexOf(response.user.role.type) >= 0) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/clients']);
        }
      },
      (error: any) => {
        this.cargando = false;
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

}
