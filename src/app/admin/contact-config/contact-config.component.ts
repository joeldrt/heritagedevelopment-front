import { Component, OnInit } from '@angular/core';
import { Configuration } from 'src/app/models/configuration';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-config',
  templateUrl: './contact-config.component.html',
  styleUrls: ['./contact-config.component.scss']
})
export class ContactConfigComponent implements OnInit {

  private configuration: Configuration;
  emailError = false;
  email: string;

  constructor(
    private configurationService: ConfigurationService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.configurationService.obtenerArchivoDeConfiguracion().subscribe(
      (response: HttpResponse<Configuration>) => {
        this.configuration = response.body;
        this.email = this.configuration.emailDeContacto;
      },
      (error: any) => {
        console.error(error);
        this.toastrService.error('Error interno, reportarlo al administrador');
      }
    );
  }

  cambiarCorreo() {
    if (!this.configuration && !this.configuration.emailDeContacto) {
      console.error('Sin archivo de configuración');
      this.toastrService.error('Error interno, reportarlo al administrador');
    }
    this.emailError = false;
    const emailRegEx = RegExp('^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+');
    if (!emailRegEx.test(this.email)) {
      this.emailError = true;
      return;
    }
    this.configuration.emailDeContacto = this.email;
    this.configurationService.actualizarArchivoDeconfiguracion(this.configuration).subscribe(
      (response: HttpResponse<Configuration>) => {
        this.configuration = response.body;
        this.toastrService.success('Correo cambiado exitosamente');
      },
      (error: any) => {
        console.error(error);
        this.toastrService.error('Error al cambiar el correo de contacto');
      }
    );
  }

}
