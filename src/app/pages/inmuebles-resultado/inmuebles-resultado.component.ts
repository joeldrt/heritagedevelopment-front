import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

  precioMenor: number;
  precioMayor: number;

  constructor(
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
      let shouldBeAdded = true;
      if (this.precioMenor !== undefined && this.precioMenor > 0) { // precio de venta mínimo
        if (propiedad.precioVenta < this.precioMenor) {
          shouldBeAdded = false;
        }
      }
      if (this.precioMayor !== undefined && this.precioMayor > 0) { // precio de venta máximo
        if (propiedad.precioVenta > this.precioMayor) {
          shouldBeAdded = false;
        }
      }
      if (shouldBeAdded) {
        this.propiedadesFiltradas.push(propiedad);
      }
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
    });
  }

  buscarPropiedades() {
    if (!this.place) {
      this.searchEmpty = true;
      return;
    }
    this.sessionService.setPlace(this.place);
    this.storageService.saveData(StorageService.SAVED_PLACE, this.place);
    this.showResults();
  }

  isFunction(functionToCheck: any) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  precioMenorChange(value: number) {
    this.precioMenor = value;
    console.log(this.precioMenor);
    this.filtrarPropiedades();
  }

  precioMayorChange(value: number) {
    this.precioMayor = value;
    console.log(this.precioMayor);
    this.filtrarPropiedades();
  }

}
