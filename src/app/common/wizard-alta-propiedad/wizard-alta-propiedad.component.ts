import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Propiedad } from '../../models/propiedad';
import { ToastrService } from '../../services/toastr/toastr.service';

@Component({
  selector: 'app-wizard-alta-propiedad',
  templateUrl: './wizard-alta-propiedad.component.html',
  styleUrls: ['./wizard-alta-propiedad.component.scss']
})
export class WizardAltaPropiedadComponent implements OnInit {
  @Input() scrollableContanierId: string;
  @Output() end_wizard = new EventEmitter<boolean>();
  numero_paso = 1;

  nueva_propiedad: Propiedad;
  mapaDeArchivos = new Map<string, File>();
  mapaDeImagenes = new Map<string, string | ArrayBuffer>();

  loading = false;

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.nueva_propiedad = new Propiedad();
    this.nueva_propiedad.tipo_propiedad = "Departamento";
    this.nueva_propiedad.nombre = "Il Depa";
    this.nueva_propiedad.m2_construccion = 89;
    this.nueva_propiedad.recamaras = 3;
    this.nueva_propiedad.banos = 1;
    this.nueva_propiedad.medios_banos = 1;
    this.nueva_propiedad.cajones_estacionamiento = 1;
    this.nueva_propiedad.descripcion = "El mejor depa de la historia... no existe nada como él";
    this.nueva_propiedad.precio_venta = 2100000;
    this.nueva_propiedad.precio_renta = 15000;
    this.nueva_propiedad.m2_terreno = 105;
    this.nueva_propiedad.niveles = 1;
    this.nueva_propiedad.amenidades = "Roof Garden, Terraza, Jardines";
    this.nueva_propiedad.tiempo_minimo_renta = 2;
    this.nueva_propiedad.capacidad_cisterna = 66000;
    this.nueva_propiedad.edad_propiedad = 30;
    this.nueva_propiedad.costo_mantenimiento = 400;
    this.mapaDeArchivos = new Map<string, File>();
    this.mapaDeImagenes = new Map<string, string | ArrayBuffer>();
  }

  sendEndSignal() {
    this.end_wizard.emit(true);
  }

  irIniciodePaginaDe() {
    var aTag = document.getElementById(this.scrollableContanierId);
    if (aTag) {
        aTag.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  pasoAnterior() {
    this.numero_paso--;
    this.irIniciodePaginaDe();
  }

  finalizarPaso1() {
    this.numero_paso = 2;
    this.irIniciodePaginaDe();
  }

  finalizarPaso2() {
    this.numero_paso = 3;
    this.irIniciodePaginaDe();
  }

  finalizarPaso3() {
    this.numero_paso = 4;
    this.irIniciodePaginaDe();
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      if (this.mapaDeArchivos.size + filesAmount > 10) {
        console.error('número máximo de fotos');
        return;
      }

      for (let i = 0; i < filesAmount; i++) {
        this.mapaDeArchivos.set(event.target.files[i].name, event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (function(theFile: File, mapaDeImagenes: Map<string, string | ArrayBuffer>) {
          var fileName = theFile.name;
          return function(event) {
            let target = event.target as FileReader;
            mapaDeImagenes.set(fileName, target.result);
          };
        })(event.target.files[i], this.mapaDeImagenes);
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  borrarImagen(imagen_key: string) {
    this.mapaDeArchivos.delete(imagen_key);
    this.mapaDeImagenes.delete(imagen_key);
  }

  finalizarPaso4() {
    this.irIniciodePaginaDe();
    this.loading = true;
    
    this.sendEndSignal();
  }

}
