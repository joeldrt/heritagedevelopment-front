import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Propiedad } from '../../models/propiedad';
import { ToastrService } from '../../services/toastr/toastr.service';
import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { finalize, take } from 'rxjs/operators';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import {} from 'googlemaps';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-wizard-alta-propiedad',
  templateUrl: './wizard-alta-propiedad.component.html',
  styleUrls: ['./wizard-alta-propiedad.component.scss']
})
export class WizardAltaPropiedadComponent implements OnInit {
  @ViewChild('wizardWorkingArea') areaToScroll: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;
  infowindow: google.maps.InfoWindow;
  geoCoder: google.maps.Geocoder;

  thisIsTheEnd: boolean;
  numeroPaso: number;
  esEdicion: boolean;
  envioAGuardar: boolean;
  propertyId: string;
  private propiedadDoc: AngularFirestoreDocument<Propiedad>;

  user: User;

  nuevaPropiedad: Propiedad;
  mapaDeArchivos = new Map<string, File>();
  mapaDeImagenes = new Map<string, string | ArrayBuffer>();
  urlsFotografiasBorrar: Array<string>;
  amenidadesSeleccionadas = [];
  listaDeAmenidades = ['Alberca', 'Roof Garden', 'Jacussi', 'Jardín', 'Gym', 'Spa', 'Cine', 'Terraza', 'Bar', 'Casa Club', 'Lago'];

  loading = false;
  mensajeLoading = 'cargando';
  contadorImagenesGuardadas = 0;

  constructor(
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private auth: AuthService,
    private propiedadService: PropiedadService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.thisIsTheEnd = false;
  }

  ngOnInit() {
    this.geoCoder = new google.maps.Geocoder();
    this.initWizard();
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    if (this.propertyId) {
      this.verificarEsEdicion(this.propertyId);
    }
  }

  navigatePrevious() {
    this.location.back();
  }

  initWizard() {
    this.urlsFotografiasBorrar = new Array<string>();
    this.envioAGuardar = false;
    this.esEdicion = false;
    this.nuevaPropiedad = new Propiedad();
    this.nuevaPropiedad.urlsFotografias = new Array<string>();
    this.mapaDeArchivos = new Map<string, File>();
    this.mapaDeImagenes = new Map<string, string | ArrayBuffer>();
    this.numeroPaso = 1;
    this.contadorImagenesGuardadas = 0;
  }

  verificarEsEdicion(propertyId: string) {
    this.propiedadDoc = this.propiedadService.obtenerPropiedad(propertyId);
    this.propiedadDoc.valueChanges().pipe(take(1)).subscribe( propiedad => {
      this.nuevaPropiedad = propiedad;
      this.nuevaPropiedad.id = propertyId;
      this.amenidadesSeleccionadas = propiedad.amenidades;
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
    this.numeroPaso--;
    if (this.numeroPaso === 2) {
      this.cargarMapa(this.nuevaPropiedad);
    }
    this.limpiarMapa();
    this.irIniciodePaginaDe();
  }

  finalizarPaso1() {
    this.numeroPaso = 2;
    this.cargarMapa(this.nuevaPropiedad);
    this.irIniciodePaginaDe();
  }

  cargarMapa(propiedad: Propiedad) {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      setTimeout(() => {
        this.cargarMapa(propiedad);
      }, 200);
      return;
    }
    let geoPoint = new firebase.firestore.GeoPoint(19.047153095866395, -98.23302070517542);
    if (propiedad.geoposicion) {
      geoPoint = new firebase.firestore.GeoPoint(
        propiedad.geoposicion.latitude,
        propiedad.geoposicion.longitude);
    }
    if (!this.map) {
      const mapProperties = {
        center: new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        // gestureHandling: 'cooperative' as google.maps.GestureHandlingOptions,
      };
      this.map = new google.maps.Map(mapElement, mapProperties);
    } else {
      // this.map.setCenter(new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude));
    }
    if (!this.marker) {
      const markerProperties = {
        position: new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude),
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: propiedad.direccion ? propiedad.direccion : '',
      };
      this.marker = new google.maps.Marker(markerProperties);
      this.marker.addListener('dragend', (event) => {
        this.cambiarDireccionPorDragNDrop(event);
      });
      this.marker.addListener('dragstart', () => {
        this.infowindow.close();
      });
    } else {
      this.marker.setTitle(propiedad.direccion ? propiedad.direccion : '');
      this.marker.setPosition(new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude));
    }
    if (!this.infowindow) {
      const infoWindowOptions = {
        content: propiedad.direccion ? propiedad.direccion : '',
      };
      this.infowindow = new google.maps.InfoWindow(infoWindowOptions);
      this.infowindow.open(this.map, this.marker);
    } else {
      this.infowindow.setContent(propiedad.direccion ? propiedad.direccion : '');
      this.infowindow.open(this.map, this.marker);
    }
  }

  cambiarDireccionPorBusqueda(place: any) {
    if (!place || !place.geometry) {
      return;
    }
    const geoPoint = new firebase.firestore.GeoPoint(
      place.geometry.location.lat(),
      place.geometry.location.lng());
    this.nuevaPropiedad.geoposicion = geoPoint;
    this.nuevaPropiedad.direccion = place.formatted_address;
    this.cargarMapa(this.nuevaPropiedad);
  }

  cambiarDireccionPorDragNDrop(place: any) {
    const geoPoint = new firebase.firestore.GeoPoint(
      place.latLng.lat(),
      place.latLng.lng());
    this.nuevaPropiedad.geoposicion = geoPoint;
    this.geoCoder.geocode({
      location: new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude),
    }, (results) => {
      this.nuevaPropiedad.direccion = results[0].formatted_address;
      this.cargarMapa(this.nuevaPropiedad);
    });
  }

  limpiarMapa() {
    this.map = undefined;
    this.marker = undefined;
    this.infowindow = undefined;
  }

  finalizarPaso2() {
    this.numeroPaso = 3;
    this.irIniciodePaginaDe();
    this.limpiarMapa();
  }

  finalizarPaso3() {
    this.numeroPaso = 4;
    this.irIniciodePaginaDe();
  }

  finalizarPaso4() {
    this.numeroPaso = 5;
    this.irIniciodePaginaDe();
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;

      const fotosNube = this.nuevaPropiedad.urlsFotografias ? this.nuevaPropiedad.urlsFotografias.length : 0;

      if ((this.mapaDeArchivos.size + filesAmount + fotosNube) > 10) {
        this.toastr.error('número máximo de fotos (10)');
        return;
      }

      for (let i = 0; i < filesAmount; i++) {
        this.mapaDeArchivos.set(event.target.files[i].name, event.target.files[i]);
        const reader = new FileReader();
        reader.onload = ((theFile: File, mapaDeImagenes: Map<string, string | ArrayBuffer>) => {
          const fileName = theFile.name;
          return (event2: any) => {
            const target = event2.target as FileReader;
            mapaDeImagenes.set(fileName, target.result);
            // limpia el input para que se puedan cargar mas fotos
            if (mapaDeImagenes.size >= filesAmount) {
              (document.getElementById('imagesInput') as HTMLInputElement).value = '';
            }
          };
        })(event.target.files[i], this.mapaDeImagenes);
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  borrarImagen(imagenKey: string) {
    this.mapaDeArchivos.delete(imagenKey);
    this.mapaDeImagenes.delete(imagenKey);
  }

  borrarImagenEdicion(position: number) {
    this.urlsFotografiasBorrar.push(this.nuevaPropiedad.urlsFotografias.splice(position, 1)[0]);
    // this.nuevaPropiedad.urlsFotografias.splice(position, 1);
  }

  finalizarPaso5() {
    if (!this.esEdicion) {
      this.nuevaPropiedad.id = this.db.createId();
    }
    this.irIniciodePaginaDe();
    if (!this.nuevaPropiedad.urlsFotografias) {
      this.nuevaPropiedad.urlsFotografias = [];
    }
    if (this.urlsFotografiasBorrar.length > 0) {
      this.urlsFotografiasBorrar.forEach((urlImagen) => {
        this.storage.storage.refFromURL(urlImagen).delete();
      });
    }
    if (this.mapaDeArchivos.size > 0) {
      this.loading = true;
      this.mensajeLoading = 'guardando imagenes';
      this.mapaDeArchivos.forEach((value: File, key: string) => {
          const file = value;
          const filePath = `propiedades/${this.nuevaPropiedad.id}/${file.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, file);
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                if (url) {
                  this.nuevaPropiedad.urlsFotografias.push(url);
                  this.contadorImagenesGuardadas += 1;
                  this.seDebeGuardarElDocumento();
                }
              });
            }),
          ).subscribe();
      });
    } else {
      this.loading = true;
      this.guardarDocumento();
    }
  }

  seDebeGuardarElDocumento() {
    this.mensajeLoading = `${this.contadorImagenesGuardadas} / ${this.mapaDeArchivos.size} imagenes guardadas`;
    if ((this.contadorImagenesGuardadas >= this.mapaDeArchivos.size) && !this.envioAGuardar) {
      this.envioAGuardar = true;
      this.guardarDocumento();
    }
  }

  guardarDocumento() {
    this.nuevaPropiedad.amenidades = this.amenidadesSeleccionadas;
    Propiedad.verificarValoresIndefinidos(this.nuevaPropiedad);
    if (!this.esEdicion) {
      this.mensajeLoading = 'guardando la propiedad';
      this.nuevaPropiedad.userUid = this.user.uid;
      const propiedadAGuardar = Object.assign({}, this.nuevaPropiedad);
      this.propiedadService.agregarPropiedad(propiedadAGuardar).then(
        (value) => {
          this.sendEndSignal();
        },
        (error) => {
          this.loading = false;
          this.toastr.error(`Error al guardar la propiedad: ${error}`);
        });
    } else {
      this.mensajeLoading = 'editando la propiedad';
      const propiedadAEditar = Object.assign({}, this.nuevaPropiedad);
      this.propiedadService.actualizarPropiedad(propiedadAEditar).then(
        (value) => {
          this.sendEndSignal();
        },
        (error) => {
          this.loading = false;
          this.toastr.error(`Error al editar la propiedad: ${error}`);
        });
    }
  }

  borrarPropiedad() {
    const urlsFotografiasBorrado = this.nuevaPropiedad.urlsFotografias;
    this.propiedadService.borrarPropiedad(this.propertyId).then(
      () => {
        this.borrarImagenesDelStorage(urlsFotografiasBorrado);
        this.router.navigate(['/admin/estate']);
        this.toastr.success(`Propiedad borrada!`);
      },
      (reason: any) => {
        this.toastr.error(`Error al borrar la propiedad: ${reason}`);
      }
    );
  }

  borrarImagenesDelStorage(urlsFotografiasBorrado: string[]) {
    urlsFotografiasBorrado.forEach((urlImagen) => {
      this.storage.storage.refFromURL(urlImagen).delete();
    });
  }

}
