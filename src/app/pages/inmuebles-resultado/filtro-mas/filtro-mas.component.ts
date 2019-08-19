import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-mas',
  templateUrl: './filtro-mas.component.html',
  styleUrls: ['./filtro-mas.component.scss']
})
export class FiltroMasComponent implements OnInit {

  INTERVALO_M2CONS = 50;
  @Input() minM2Construccion = 0;
  @Output() minM2ConstruccionChange = new EventEmitter<number>();

  INTERVALO_M2TERRENO = 50;
  @Input() minM2Terreno = 0;
  @Output() minM2TerrenoChange = new EventEmitter<number>();

  INTERVALO_NIVELES = 1;
  @Input() minNiveles = 0;
  @Output() minNivelesChange = new EventEmitter<number>();

  INTERVALO_RECAMARAS = 1;
  @Input() minRecamaras = 0;
  @Output() minRecamarasChange = new EventEmitter<number>();

  INTERVALO_BANOS = 1;
  @Input() minBanos = 0;
  @Output() minBanosChange = new EventEmitter<number>();

  INTERVALO_MEDIOS_BANOS = 1;
  @Input() minMediosBanos = 0;
  @Output() minMediosBanosChange = new EventEmitter<number>();

  INTERVALO_CAJONES_ESTACIONAMIENTO = 1;
  @Input() minCajonesEstacionamiento = 0;
  @Output() minCajonesEstacionamientoChange = new EventEmitter<number>();

  INTERVALO_CAPACIDAD_CISTERNA = 1000;
  @Input() minCapacidadCisterna = 0;
  @Output() minCapacidadCisternaChange = new EventEmitter<number>();

  INTERVALO_EDAD_PROPIEDAD = 1;
  @Input() maxEdadPropiedad = 0;
  @Output() maxEdadPropiedadChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  // M2 Construcción

  handleMinM2ConsChange(value: number) {
    this.minM2Construccion = value;
    this.minM2ConstruccionChange.emit(this.minM2Construccion);
  }

  disminuirM2Cons() {
    if (this.minM2Construccion - this.INTERVALO_M2CONS < 0) {
      this.minM2Construccion = 0;
    } else {
      this.minM2Construccion = this.minM2Construccion - this.INTERVALO_M2CONS;
    }
    this.minM2ConstruccionChange.emit(this.minM2Construccion);
  }

  aumentarM2Cons() {
    this.minM2Construccion = this.minM2Construccion + this.INTERVALO_M2CONS;
    this.minM2ConstruccionChange.emit(this.minM2Construccion);
  }

  // M2 Terreno

  handleMinM2TerrenoChange(value: number) {
    this.minM2Terreno = value;
    this.minM2TerrenoChange.emit(this.minM2Terreno);
  }

  disminuirM2Terreno() {
    if (this.minM2Terreno - this.INTERVALO_M2TERRENO < 0) {
      this.minM2Terreno = 0;
    } else {
      this.minM2Terreno = this.minM2Terreno - this.INTERVALO_M2TERRENO;
    }
    this.minM2TerrenoChange.emit(this.minM2Terreno);
  }

  aumentarM2Terreno() {
    this.minM2Terreno = this.minM2Terreno + this.INTERVALO_M2TERRENO;
    this.minM2TerrenoChange.emit(this.minM2Terreno);
  }

  // Niveles

  handleNivelesChange(value: number) {
    this.minNiveles = value;
    this.minNivelesChange.emit(this.minNiveles);
  }

  disminuirNiveles() {
    if (this.minNiveles - this.INTERVALO_NIVELES < 0) {
      this.minNiveles = 0;
    } else {
      this.minNiveles = this.minNiveles - this.INTERVALO_NIVELES;
    }
    this.minNivelesChange.emit(this.minNiveles);
  }

  aumentarNiveles() {
    this.minNiveles = this.minNiveles + this.INTERVALO_NIVELES;
    this.minNivelesChange.emit(this.minNiveles);
  }

  // Recamaras

  handleRecamarasChange(value: number) {
    this.minRecamaras = value;
    this.minRecamarasChange.emit(this.minRecamaras);
  }

  disminuirRecamaras() {
    if (this.minRecamaras - this.INTERVALO_RECAMARAS < 0) {
      this.minRecamaras = 0;
    } else {
      this.minRecamaras = this.minRecamaras - this.INTERVALO_RECAMARAS;
    }
    this.minRecamarasChange.emit(this.minRecamaras);
  }

  aumentarRecamaras() {
    this.minRecamaras = this.minRecamaras + this.INTERVALO_RECAMARAS;
    this.minRecamarasChange.emit(this.minRecamaras);
  }

  // Baños

  handleBanosChange(value: number) {
    this.minBanos = value;
    this.minBanosChange.emit(this.minBanos);
  }

  disminuirBanos() {
    if (this.minBanos - this.INTERVALO_BANOS < 0) {
      this.minBanos = 0;
    } else {
      this.minBanos = this.minBanos - this.INTERVALO_BANOS;
    }
    this.minBanosChange.emit(this.minBanos);
  }

  aumentarBanos() {
    this.minBanos = this.minBanos + this.INTERVALO_BANOS;
    this.minBanosChange.emit(this.minBanos);
  }

  // Medios baños

  handleMediosBanosChange(value: number) {
    this.minMediosBanos = value;
    this.minMediosBanosChange.emit(this.minMediosBanos);
  }

  disminuirMediosBanos() {
    if (this.minMediosBanos - this.INTERVALO_MEDIOS_BANOS < 0) {
      this.minMediosBanos = 0;
    } else {
      this.minMediosBanos = this.minMediosBanos - this.INTERVALO_MEDIOS_BANOS;
    }
    this.minMediosBanosChange.emit(this.minMediosBanos);
  }

  aumentarMediosBanos() {
    this.minMediosBanos = this.minMediosBanos + this.INTERVALO_MEDIOS_BANOS;
    this.minMediosBanosChange.emit(this.minMediosBanos);
  }

  // Cajones estacionamiento

  handleCajonesChange(value: number) {
    this.minCajonesEstacionamiento = value;
    this.minCajonesEstacionamientoChange.emit(this.minCajonesEstacionamiento);
  }

  disminuirCajones() {
    if (this.minCajonesEstacionamiento - this.INTERVALO_CAJONES_ESTACIONAMIENTO < 0) {
      this.minCajonesEstacionamiento = 0;
    } else {
      this.minCajonesEstacionamiento = this.minCajonesEstacionamiento - this.INTERVALO_CAJONES_ESTACIONAMIENTO;
    }
    this.minCajonesEstacionamientoChange.emit(this.minCajonesEstacionamiento);
  }

  aumentarCajones() {
    this.minCajonesEstacionamiento = this.minCajonesEstacionamiento + this.INTERVALO_CAJONES_ESTACIONAMIENTO;
    this.minCajonesEstacionamientoChange.emit(this.minCajonesEstacionamiento);
  }

  // Capacidad Cisterna

  handleCapacidadCisternaChange(value: number) {
    this.minCapacidadCisterna = value;
    this.minCapacidadCisternaChange.emit(this.minCapacidadCisterna);
  }

  disminuirCapacidadCisterna() {
    if (this.minCapacidadCisterna - this.INTERVALO_CAPACIDAD_CISTERNA < 0) {
      this.minCapacidadCisterna = 0;
    } else {
      this.minCapacidadCisterna = this.minCapacidadCisterna - this.INTERVALO_CAPACIDAD_CISTERNA;
    }
    this.minCapacidadCisternaChange.emit(this.minCapacidadCisterna);
  }

  aumentarCapacidadCisterna() {
    this.minCapacidadCisterna = this.minCapacidadCisterna + this.INTERVALO_CAPACIDAD_CISTERNA;
    this.minCapacidadCisternaChange.emit(this.minCapacidadCisterna);
  }

  // Edad Propiedad

  handleEdadPropiedadChange(value: number) {
    this.maxEdadPropiedad = value;
    this.maxEdadPropiedadChange.emit(this.maxEdadPropiedad);
  }

  disminuirEdadPropiedad() {
    if (this.maxEdadPropiedad - this.INTERVALO_EDAD_PROPIEDAD < 0) {
      this.maxEdadPropiedad = 0;
    } else {
      this.maxEdadPropiedad = this.maxEdadPropiedad - this.INTERVALO_EDAD_PROPIEDAD;
    }
    this.maxEdadPropiedadChange.emit(this.maxEdadPropiedad);
  }

  aumentarEdadPropiedad() {
    this.maxEdadPropiedad = this.maxEdadPropiedad + this.INTERVALO_EDAD_PROPIEDAD;
    this.maxEdadPropiedadChange.emit(this.maxEdadPropiedad);
  }

}
