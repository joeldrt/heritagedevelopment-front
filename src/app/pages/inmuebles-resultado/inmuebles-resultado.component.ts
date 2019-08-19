import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { Propiedad } from '../../models/propiedad';
import { Router } from '@angular/router';
import { GeoQuerySnapshot } from 'geofirestore';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Amenidades } from 'src/app/models/amenidades';

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

  m2Construccion: number; // metros cuadrados de construcción
  m2Terreno: number; // metros cuadrados de terreno
  niveles: number; // niveles que contiene la propiedad (pisos)
  recamaras: number; // número de recamaras
  banos: number; // número de baños
  mediosBanos: number; // número de medios baños
  cajonesEstacionamiento: number; // numero de cajones de estacionamiento
  capacidadCisterna: number; // capacidad de la cisterna
  edadPropiedad: number; // edad de la propiedad

  amenidades: Array<string>;

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
    this.m2Construccion = this.storageService.getData(StorageService.FILTER_M2_CONSTRUCCION);
    if (!this.m2Construccion) { this.m2Construccion = 0; }
    this.m2Terreno = this.storageService.getData(StorageService.FILTER_M2_TERRENO);
    if (!this.m2Terreno) { this.m2Terreno = 0; }
    this.niveles = this.storageService.getData(StorageService.FILTER_NIVELES);
    if (!this.niveles) { this.niveles = 0; }
    this.recamaras = this.storageService.getData(StorageService.FILTER_RECAMARAS);
    if (!this.recamaras) { this.recamaras = 0; }
    this.banos = this.storageService.getData(StorageService.FILTER_BANOS);
    if (!this.banos) { this.banos = 0; }
    this.mediosBanos = this.storageService.getData(StorageService.FILTER_MEDIOS_BANOS);
    if (!this.mediosBanos) { this.mediosBanos = 0; }
    this.cajonesEstacionamiento = this.storageService.getData(StorageService.FILTER_CAJONES_ESTACIONAMIENT);
    if (!this.cajonesEstacionamiento) { this.cajonesEstacionamiento = 0; }
    this.capacidadCisterna = this.storageService.getData(StorageService.FILTER_CAPACIDAD_CISTERNA);
    if (!this.capacidadCisterna) { this.capacidadCisterna = 0; }
    this.edadPropiedad = this.storageService.getData(StorageService.FILTER_EDAD_PROPIEDAD);
    if (!this.edadPropiedad) { this.edadPropiedad = 0; }
    this.amenidades = this.storageService.getData(StorageService.FILTER_AMENIDADES);
    if (!this.amenidades) {
      this.amenidades = ['Alberca', 'Roof Garden', 'Jacussi', 'Jardín', 'Gym', 'Spa', 'Cine', 'Terraza', 'Bar', 'Casa Club', 'Lago'];
      this.storageService.saveData(StorageService.FILTER_AMENIDADES, this.amenidades);
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
      // siempre debe tener un tipo de propiedad
      if (this.tiposPropiedad === undefined || this.tiposPropiedad == null || this.tiposPropiedad.length === 0) {
        return;
      }
      if (this.tiposPropiedad && this.tiposPropiedad.length > 0) {
        if (this.tiposPropiedad.indexOf(propiedad.tipoPropiedad) === -1) {
          return;
        }
      }
      if (this.m2Construccion !== undefined && this.m2Construccion != null && this.m2Construccion !== 0) {
        if (!propiedad.m2Construccion) {
          return;
        }
        if (propiedad.m2Construccion < this.m2Construccion) {
          return;
        }
      }
      if (this.m2Terreno !== undefined && this.m2Terreno != null && this.m2Terreno !== 0) {
        if (!propiedad.m2Terreno) {
          return;
        }
        if (propiedad.m2Terreno < this.m2Terreno) {
          return;
        }
      }
      if (this.niveles !== undefined && this.niveles != null && this.niveles !== 0) {
        if (!propiedad.niveles) {
          return;
        }
        if (propiedad.niveles < this.niveles) {
          return;
        }
      }
      if (this.recamaras !== undefined && this.recamaras != null && this.recamaras !== 0) {
        if (!propiedad.recamaras) {
          return;
        }
        if (propiedad.recamaras < this.recamaras) {
          return;
        }
      }
      if (this.banos !== undefined && this.banos != null && this.banos !== 0) {
        if (!propiedad.banos) {
          return;
        }
        if (propiedad.banos < this.banos) {
          return;
        }
      }
      if (this.mediosBanos !== undefined && this.mediosBanos != null && this.mediosBanos !== 0) {
        if (!propiedad.mediosBanos) {
          return;
        }
        if (propiedad.mediosBanos < this.mediosBanos) {
          return;
        }
      }
      if (this.cajonesEstacionamiento !== undefined && this.cajonesEstacionamiento != null && this.cajonesEstacionamiento !== 0) {
        if (!propiedad.cajonesEstacionamiento) {
          return;
        }
        if (propiedad.cajonesEstacionamiento < this.cajonesEstacionamiento) {
          return;
        }
      }
      if (this.capacidadCisterna !== undefined && this.capacidadCisterna != null && this.capacidadCisterna !== 0) {
        if (!propiedad.capacidadCisterna) {
          return;
        }
        if (propiedad.capacidadCisterna < this.capacidadCisterna) {
          return;
        }
      }
      if (this.edadPropiedad !== undefined && this.edadPropiedad != null && this.edadPropiedad !== 0) {
        if (!propiedad.edadPropiedad) {
          return;
        }
        if (propiedad.edadPropiedad > this.edadPropiedad) {
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
    if (this.precioMenor === undefined || this.precioMenor == null || isNaN(this.precioMenor)) {
      this.precioMenor = 0;
    }
    this.precioMenor = value;
    console.log(this.precioMenor);
    this.storageService.saveData(StorageService.FILTER_PRECIO_MENOR, this.precioMenor);
    this.filtrarPropiedades();
  }

  precioMayorChange(value: number) {
    if (this.precioMayor === undefined || this.precioMayor == null || isNaN(this.precioMayor)) {
      this.precioMayor = 0;
    }
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

  m2ConstruccionChange(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this.m2Construccion === undefined || this.m2Construccion == null) {
      this.m2Construccion = 0;
    }
    this.m2Construccion = value;
    console.log(this.m2Construccion);
    this.storageService.saveData(StorageService.FILTER_M2_CONSTRUCCION, this.m2Construccion);
    this.filtrarPropiedades();
  }

  m2TerrenoChange(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this.m2Terreno === undefined || this.m2Terreno == null) {
      this.m2Terreno = 0;
    }
    this.m2Terreno = value;
    console.log(this.m2Terreno);
    this.storageService.saveData(StorageService.FILTER_M2_TERRENO, this.m2Terreno);
    this.filtrarPropiedades();
  }

  nivelesChange(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this.niveles === undefined || this.niveles == null) {
      this.niveles = 0;
    }
    this.niveles = value;
    console.log(this.niveles);
    this.storageService.saveData(StorageService.FILTER_NIVELES, this.niveles);
    this.filtrarPropiedades();
  }

  recamarasChange(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this.recamaras === undefined || this.recamaras == null) {
      this.recamaras = 0;
    }
    this.recamaras = value;
    console.log(this.recamaras);
    this.storageService.saveData(StorageService.FILTER_RECAMARAS, this.recamaras);
    this.filtrarPropiedades();
  }

  banosChange(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this.banos === undefined || this.banos == null) {
      this.banos = 0;
    }
    this.banos = value;
    console.log(this.banos);
    this.storageService.saveData(StorageService.FILTER_BANOS, this.banos);
    this.filtrarPropiedades();
  }

  mediosBanosChange(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this.mediosBanos === undefined || this.mediosBanos == null) {
      this.mediosBanos = 0;
    }
    this.mediosBanos = value;
    console.log(this.mediosBanos);
    this.storageService.saveData(StorageService.FILTER_MEDIOS_BANOS, this.mediosBanos);
    this.filtrarPropiedades();
  }

  cajonesEstacionamientoChange(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this.cajonesEstacionamiento === undefined || this.cajonesEstacionamiento == null) {
      this.cajonesEstacionamiento = 0;
    }
    this.cajonesEstacionamiento = value;
    console.log(this.cajonesEstacionamiento);
    this.storageService.saveData(StorageService.FILTER_CAJONES_ESTACIONAMIENT, this.cajonesEstacionamiento);
    this.filtrarPropiedades();
  }

  capacidadCisternaChange(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this.capacidadCisterna === undefined || this.capacidadCisterna == null) {
      this.capacidadCisterna = 0;
    }
    this.capacidadCisterna = value;
    console.log(this.capacidadCisterna);
    this.storageService.saveData(StorageService.FILTER_CAPACIDAD_CISTERNA, this.capacidadCisterna);
    this.filtrarPropiedades();
  }

  edadPropiedadChange(value: number) {
    if (isNaN(value)) {
      value = 0;
    }
    if (this.edadPropiedad === undefined || this.edadPropiedad == null) {
      this.edadPropiedad = 0;
    }
    this.edadPropiedad = value;
    console.log(this.edadPropiedad);
    this.storageService.saveData(StorageService.FILTER_EDAD_PROPIEDAD, this.edadPropiedad);
    this.filtrarPropiedades();
  }

}
