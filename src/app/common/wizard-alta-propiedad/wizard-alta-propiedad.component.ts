import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Propiedad, PropiedadObj } from '../../models/propiedad';
import { ToastrService } from '../../services/toastr/toastr.service';
import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { finalize, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wizard-alta-propiedad',
  templateUrl: './wizard-alta-propiedad.component.html',
  styleUrls: ['./wizard-alta-propiedad.component.scss']
})
export class WizardAltaPropiedadComponent implements OnInit {
  @ViewChild('wizardWorkingArea') areaToScroll: ElementRef;

  thisIsTheEnd: boolean;
  numero_paso: number;
  esEdicion: boolean;
  envioAGuardar: boolean;
  property_id: string;
  private propiedadDoc: AngularFirestoreDocument<Propiedad>;

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
    private _location: Location,
    private route: ActivatedRoute,
  ) { 
    this.thisIsTheEnd = false;
  }

  ngOnInit() {
    this.initWizard();
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
    this.property_id = this.route.snapshot.paramMap.get("property_id");
    if (this.property_id) {
      this.verificarEsEdicion(this.property_id);
    }
  }

  navigatePrevious() {
    this._location.back();
  }

  initWizard() {
    this.envioAGuardar = false;
    this.esEdicion = false;
    this.nueva_propiedad = new PropiedadObj();
    this.nueva_propiedad.urls_fotografias = new Array<string>();
    this.mapaDeArchivos = new Map<string, File>();
    this.mapaDeImagenes = new Map<string, string | ArrayBuffer>();
    this.numero_paso = 1;
    this.contador_imagenes_guardadas = 0;
  }

  verificarEsEdicion(property_id: string) {
    this.propiedadDoc = this.propiedadService.obtenerPropiedad(property_id);
    this.propiedadDoc.valueChanges().pipe(take(1)).subscribe( propiedad => {
      this.nueva_propiedad = propiedad;
      this.nueva_propiedad.id = property_id;
      this.esEdicion = true;
    });
  }

  sendEndSignal() {
    this.loading = false;
    this.thisIsTheEnd = true;
  }

  irIniciodePaginaDe() {
    this.areaToScroll.nativeElement.scrollTo({top: 0, behavior: 'smooth'});
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
    // this.mapaDeImagenes.forEach((value: string | ArrayBuffer, key: string) => {
    //   this.nueva_propiedad.urls_fotografias.push(value.toString());
    // }); 
    this.nueva_propiedad.mapaDeImagenes = this.mapaDeImagenes;
    this.irIniciodePaginaDe();
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      var fotos_nube = this.nueva_propiedad.urls_fotografias ? this.nueva_propiedad.urls_fotografias.length : 0;

      if ((this.mapaDeArchivos.size + filesAmount + fotos_nube) > 10) {
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
            // limpia el input para que se puedan cargar mas fotos
            if(mapaDeImagenes.size >= filesAmount) {
              (<HTMLInputElement>document.getElementById('imagesInput')).value = '';
            }
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

  borrarImagenEdicion(position: number) {
    this.nueva_propiedad.urls_fotografias.splice(position, 1);
  }

  finalizarPaso4() {
    this.irIniciodePaginaDe();
    if (!this.nueva_propiedad.urls_fotografias) {
      this.nueva_propiedad.urls_fotografias = [];
    }
    if (this.mapaDeArchivos.size > 0) {
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
    } else {
      this.loading = true;
      this.guardarDocumento();
    }
  }

  seDebeGuardarElDocumento() {
    this.mensaje_loading = `${this.contador_imagenes_guardadas} / ${this.mapaDeArchivos.size} imagenes guardadas`;
    if ((this.contador_imagenes_guardadas >= this.mapaDeArchivos.size) && !this.envioAGuardar) {
      this.envioAGuardar = true;
      this.guardarDocumento();
    }
  }

  guardarDocumento() {
    if (!this.esEdicion) {
      this.mensaje_loading = 'guardando la propiedad';
      this.nueva_propiedad.user_uid = this.user.uid;
      PropiedadObj.verificarValoresIndefinidos(this.nueva_propiedad);
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
    } else {
      this.mensaje_loading = 'editando la propiedad';
      PropiedadObj.verificarValoresIndefinidos(this.nueva_propiedad);
      this.propiedad = {
        id: this.nueva_propiedad.id,
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
    
      this.propiedadService.actualizarPropiedad(this.propiedad).then(
        (value) => {
          this.sendEndSignal();
        },
        (error) => {
          this.loading = false;
          this.toastr.error(`Error al editar la propiedad: ${error}`);
        });
    }
  }

}
