import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register/register.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-ofertar',
  templateUrl: './ofertar.component.html',
  styleUrls: ['./ofertar.component.scss']
})
export class OfertarComponent implements OnInit {

  email: string;
  emailError = false;

  password: string;
  passwordError = false;

  informationSended = false;
  cargando = false;

  constructor(
    private registerService: RegisterService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
  }

  hacerRegistro() {
    this.emailError = false;
    this.passwordError = false;
    const emailRegEx = RegExp('^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+');
    if (!emailRegEx.test(this.email)) {
      this.emailError = true;
      return;
    }
    const phoneRegEx = RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,9}');
    if (!phoneRegEx.test(this.password)) {
      this.passwordError = true;
      return;
    }
    this.cargando = true;
    this.registerService.registrarse(this.email, this.password).subscribe(
      (response: HttpResponse<any>) => {
        this.cargando = false;
        console.log(response.body.user);
        this.informationSended = true;
        this.toastrService.success('Formulario enviado');
      },
      (error: any) => {
        this.cargando = false;
        console.error(error.error.message);
        this.toastrService.error(error.error.message, 'Error');
      }
    );
  }

}
