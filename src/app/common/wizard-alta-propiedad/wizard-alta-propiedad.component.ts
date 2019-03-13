import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Propiedad, PropiedadObj } from '../../models/propiedad';
import { ToastrService } from '../../services/toastr/toastr.service';
import { PropiedadService } from '../../services/propiedad/propiedad.service';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-wizard-alta-propiedad',
  templateUrl: './wizard-alta-propiedad.component.html',
  styleUrls: ['./wizard-alta-propiedad.component.scss']
})
export class WizardAltaPropiedadComponent implements OnInit {
  @Input() scrollableContanierId: string;
  @Output() end_wizard = new EventEmitter<boolean>();
  @Input() thisIsTheEnd: boolean;
  numero_paso = 1;

  user: User;

  nueva_propiedad: PropiedadObj;
  propiedad: Propiedad;
  mapaDeArchivos = new Map<string, File>();
  mapaDeImagenes = new Map<string, string | ArrayBuffer>();

  loading = false;
  mensaje_loading = "cargando";
  contador_imagenes_guardadas = 0;

  constructor(
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private auth: AuthService,
    private propiedadService: PropiedadService,
  ) { 
    this.thisIsTheEnd = false;
  }

  ngOnInit() {
    this.initWizard();
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }

  initWizard() {
    this.nueva_propiedad = new PropiedadObj();
    this.nueva_propiedad.urls_fotografias = new Array<string>();
    this.mapaDeArchivos = new Map<string, File>();
    this.mapaDeImagenes = new Map<string, string | ArrayBuffer>();
    this.numero_paso = 1;
  }

  sendEndSignal() {
    this.loading = false;
    this.thisIsTheEnd = true;
    this.initWizard();
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
    this.mapaDeImagenes.forEach((value: string | ArrayBuffer, key: string) => {
      this.nueva_propiedad.urls_fotografias.push(value.toString());
    }); 
    this.irIniciodePaginaDe();
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      if (this.mapaDeArchivos.size + filesAmount > 10) {
        this.toastr.error('número máximo de fotos (10)');
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
    this.nueva_propiedad.urls_fotografias = [];
    this.loading = true;
    this.mensaje_loading = "guardando imagenes";
    this.mapaDeArchivos.forEach((value: File, key: string) => {
        const file = value;
        const filePath = `propiedades/${this.user.uid}/${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        task.snapshotChanges().pipe(
          finalize(() => {
            this.contador_imagenes_guardadas += 1;
            fileRef.getDownloadURL().subscribe(url => {
              if (url) {
                this.nueva_propiedad.urls_fotografias.push(url);
                this.seDebeGuardarElDocumento();
              }
            })
          }),
        ).subscribe();
    });
  }

  seDebeGuardarElDocumento() {
    this.mensaje_loading = `${this.contador_imagenes_guardadas} / ${this.mapaDeArchivos.size} imagenes guardadas`;
    if (this.nueva_propiedad.urls_fotografias.length >= this.mapaDeArchivos.size) {
      this.guardarDocumento();
    }
  }

  guardarDocumento() {
    this.nueva_propiedad.user_uid = this.user.uid;
    this.nueva_propiedad.verificarValoresIndefinidos();
    this.propiedad = {
      id: "",
      user_uid: this.nueva_propiedad.user_uid,
      tipo_propiedad: this.nueva_propiedad.tipo_propiedad,
      nombre: this.nueva_propiedad.nombre,
      m2_construccion: this.nueva_propiedad.m2_construccion,
      recamaras: this.nueva_propiedad.recamaras,
      banos: this.nueva_propiedad.banos,
      medios_banos: this.nueva_propiedad.medios_banos,
      cajones_estacionamiento: this.nueva_propiedad.cajones_estacionamiento,
      descripcion: this.nueva_propiedad.descripcion,
      direccion: this.nueva_propiedad.direccion,
      precio_venta: this.nueva_propiedad.precio_venta,
      precio_renta: this.nueva_propiedad.precio_renta,
      m2_terreno: this.nueva_propiedad.m2_terreno,
      niveles: this.nueva_propiedad.niveles,
      amenidades: this.nueva_propiedad.amenidades,
      tiempo_minimo_renta: this.nueva_propiedad.tiempo_minimo_renta,
      capacidad_cisterna: this.nueva_propiedad.capacidad_cisterna,
      edad_propiedad: this.nueva_propiedad.edad_propiedad,
      costo_mantenimiento: this.nueva_propiedad.costo_mantenimiento,
      urls_fotografias: this.nueva_propiedad.urls_fotografias
    }
    this.propiedadService.agregarPropiedad(this.propiedad).then(
      (value) => {
        this.sendEndSignal();
      },
      (error) => {
        this.loading = false;
        this.toastr.error(`Error al guardar la propiedad: ${error}`);
      });
  }

}
