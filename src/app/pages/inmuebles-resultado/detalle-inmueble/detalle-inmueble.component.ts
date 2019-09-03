import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Propiedad } from 'src/app/models/propiedad';
import { EmailService } from 'src/app/services/email/email.service';
import { HdEmail } from 'src/app/models/hd_email';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { Configuration } from 'src/app/models/configuration';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-detalle-inmueble',
  templateUrl: './detalle-inmueble.component.html',
  styleUrls: ['./detalle-inmueble.component.scss']
})
export class DetalleInmuebleComponent implements OnInit {
  @Input() propiedadAMostrar: Propiedad;

  private configurationFile: Configuration;

  emailError = false;
  telefonoError = false;
  mensajeError = false;

  email: string;
  telefono: string;

  cargando = false;
  emailEnviado = false;
  mostrarFormulario = true;

  constructor(
    private emailService: EmailService,
    private configurationService: ConfigurationService,
  ) { }

  ngOnInit() {
    this.configurationService.obtenerArchivoDeConfiguracion().subscribe(
      (response: HttpResponse<Configuration>) => {
        this.mostrarFormulario = true;
        this.configurationFile = response.body;
        if (!this.configurationFile.emailDeContacto) {
          console.error('Error, el documento de configuración no tiene un correo asignado');
          this.mostrarFormulario = false;
        }
      },
      (error: any) => {
        console.error(error);
        this.mostrarFormulario = false;
      }
    );
  }

  limpiarCampos() {
    this.emailError = false;
    this.telefonoError = false;
    this.mensajeError = false;

    this.email = null;
    this.telefono = null;

    this.cargando = false;
    this.emailEnviado = false;
  }

  enviarMensaje(mensaje: string) {
    this.emailError = false;
    this.telefonoError = false;
    this.mensajeError = false;
    const emailRegEx = RegExp('^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+');
    if (!emailRegEx.test(this.email)) {
      this.emailError = true;
      return;
    }
    const phoneRegEx = RegExp('^\\d{10}');
    if (!phoneRegEx.test(this.telefono)) {
      this.telefonoError = true;
      return;
    }
    if (mensaje.trim().length < 2) {
      this.mensajeError = true;
      return;
    }
    this.cargando = true;
    const hdEmail = new HdEmail();
    // hdEmail.to = 'contacto@heritagedevelopment.co';
    hdEmail.to = `${this.configurationFile.emailDeContacto}`;
    hdEmail.subject = `Contacto desde la página inmueble: ${this.propiedadAMostrar.nombre}`;
    hdEmail.html =
      `<p>Hay una persona interesada en el inmueble ${this.propiedadAMostrar.nombre}</p>
      <p>Datos de contacto:<p>
      <p>Email: <a href="mailto:${this.email}">${this.email}</a></p>
      <p>Teléfono: <a href="tel:${this.telefono}">${this.telefono}</a></p>
      <p>Mensaje: ${mensaje}
      <p>
      <p>Liga del inmueble: <a href="https://heritagedevelopment.co/#/admin/estate/${this.propiedadAMostrar.id}">
      ${this.propiedadAMostrar.nombre}</a></p>`;
    this.emailService.mandarEmailStrapi(hdEmail).subscribe(
      (response: any) => {
        this.cargando = false;
        this.emailEnviado = true;
        console.log('email enviado');
      },
      (error: any) => {
        this.cargando = false;
        console.error(error);
      }
    );

  }

}
