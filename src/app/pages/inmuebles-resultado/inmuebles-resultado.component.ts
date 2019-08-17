import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { Propiedad } from '../../models/propiedad';
import { Router } from '@angular/router';
import { GeoQuerySnapshot } from 'geofirestore';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-inmuebles-resultado',
  templateUrl: './inmuebles-resultado.component.html',
  styleUrls: ['./inmuebles-resultado.component.scss']
})
export class InmueblesResultadoComponent implements OnInit, AfterViewInit {
  @ViewChild('addressInput') addressInput: any;

  place: google.maps.places.PlaceResult;
  propiedades: Propiedad[];
  propiedadesFiltradas: Propiedad[];
  searchEmpty = false;

  rentaVenta: string; // filtro de renta o venta

  precioMenor: number; // filtro precio menor
  precioMayor: number; // filtro precio mayor

  tiposPropiedad: Array<string>; // filtro tipo propiedad

  constructor(
    private zone: NgZone,
    private sessionService: SessionService,
    private propiedadService: PropiedadService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.place = this.sessionService.getPlace();
    if (!this.place) {
      const storedPlace = this.storageService.getData(StorageService.SAVED_PLACE);
      if (!storedPlace) {
        this.router.navigate(['inmuebles']);
        return;
      }
      this.place = storedPlace as google.maps.places.PlaceResult;
    }
    this.rentaVenta = this.storageService.getData(StorageService.FILTER_RENTA_VENTA);
    if (this.rentaVenta === undefined || this.rentaVenta === null) {
      this.rentaVenta = 'renta';
      this.storageService.saveData(StorageService.FILTER_RENTA_VENTA, 'renta');
    }
    this.precioMenor = this.storageService.getData(StorageService.FILTER_PRECIO_MENOR);
    this.precioMayor = this.storageService.getData(StorageService.FILTER_PRECIO_MAYOR);
    this.tiposPropiedad = this.storageService.getData(StorageService.FILTER_TIPO_PROPIEDAD);
    if (this.tiposPropiedad === undefined || this.tiposPropiedad == null) {
      this.tiposPropiedad = ['Casa', 'Departamento', 'Oficina', 'Terreno'];
      this.storageService.saveData(StorageService.FILTER_TIPO_PROPIEDAD, this.tiposPropiedad);
    }
  }

  ngAfterViewInit() {
    if (this.place) {
      this.createAutocompleteInput();
      this.addressInput.nativeElement.value = this.place.formatted_address;
      this.showResults();
    }
  }

  showResults() {
    let lat: number;
    let lng: number;
    if (this.isFunction(this.place.geometry.location.lat)) {
      lat = this.place.geometry.location.lat();
      lng = this.place.geometry.location.lng();
    } else {
      lat = this.place.geometry.location.lat as any;
      lng = this.place.geometry.location.lng as any;
    }
    this.propiedadService.obtenerPropiedadesCercanasA(lat, lng)
    .then(
      (value: GeoQuerySnapshot) => {
        this.sessionService.setPlace(this.place);
        this.storageService.saveData(StorageService.SAVED_PLACE, this.place);
        this.propiedades = new Array<Propiedad>();
        value.docs.forEach((element) => {
          this.propiedades.push(element.data() as Propiedad);
        });
        this.filtrarPropiedades();
      }
    );
  }

  filtrarPropiedades() {
    this.propiedadesFiltradas = new Array<Propiedad>();
    this.propiedades.forEach((propiedad) => {
      if (this.rentaVenta === 'venta') {
        if (propiedad.precioVenta === undefined || propiedad.precioVenta == null) { // verifica si tiene precio de venta el inmueble
          return;
        }
        if (this.precioMenor !== undefined && this.precioMenor > 0) { // precio de venta mínimo
          if (propiedad.precioVenta && (propiedad.precioVenta < this.precioMenor)) {
            return;
          }
        }
        if (this.precioMayor !== undefined && this.precioMayor > 0) { // precio de venta máximo
          if (propiedad.precioVenta && (propiedad.precioVenta > this.precioMayor)) {
            return;
          }
        }
      } else {
        if (propiedad.precioRenta === undefined || propiedad.precioRenta == null) { // verifica si tiene precio de renta el inmueble
          return;
        }
        if (this.precioMenor !== undefined && this.precioMenor > 0) { // precio de renta mínimo
          if (propiedad.precioRenta && (propiedad.precioRenta < this.precioMenor)) {
            return;
          }
        }
        if (this.precioMayor !== undefined && this.precioMayor > 0) { // precio de renta máximo
          if (propiedad.precioRenta && (propiedad.precioRenta > this.precioMayor)) {
            return;
          }
        }
      }
      if (this.tiposPropiedad === undefined || this.tiposPropiedad == null || this.tiposPropiedad.length === 0) {
        return;
      }
      if (this.tiposPropiedad && this.tiposPropiedad.length > 0) {
        if (this.tiposPropiedad.indexOf(propiedad.tipoPropiedad) === -1) {
          return;
        }
      }
      // si pasa todos los filtros, la propiedad es agregada para mostrarse
      this.propiedadesFiltradas.push(propiedad);
    });
  }

  createAutocompleteInput() {
    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement,
      {
          // bounds: new google.maps.LatLngBounds(
          //   new google.maps.LatLng(18.842749,  -98.471144),
          //   new google.maps.LatLng(19.133659,  -98.024678)
          // ),
          componentRestrictions: { country: 'MX' },
          types: [],  // 'establishment' / 'address' / 'geocode' -- muestra colonias y zonas
          strictBounds: false, // true limitado a puebla - false limitado a país méxico
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.place = autocomplete.getPlace();
        this.searchEmpty = false;
        this.zone.run(() => {
          this.buscarPropiedades();
        });
    });
  }

  buscarPropiedades() {
    if (!this.place) {
      this.searchEmpty = true;
      return;
    }
    this.showResults();
  }

  isFunction(functionToCheck: any) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  precioMenorChange(value: number) {
    this.precioMenor = value;
    console.log(this.precioMenor);
    this.storageService.saveData(StorageService.FILTER_PRECIO_MENOR, this.precioMenor);
    this.filtrarPropiedades();
  }

  precioMayorChange(value: number) {
    this.precioMayor = value;
    console.log(this.precioMayor);
    this.storageService.saveData(StorageService.FILTER_PRECIO_MAYOR, this.precioMayor);
    this.filtrarPropiedades();
  }

  rentaventaChange(value: string) {
    this.rentaVenta = value;
    console.log(this.rentaVenta);
    this.storageService.saveData(StorageService.FILTER_RENTA_VENTA, this.rentaVenta);
    this.filtrarPropiedades();
  }

  tiposPropiedadChange(value: Array<string>) {
    this.tiposPropiedad = value;
    console.log(this.tiposPropiedad);
    this.storageService.saveData(StorageService.FILTER_TIPO_PROPIEDAD, this.tiposPropiedad);
    this.filtrarPropiedades();
  }

}
