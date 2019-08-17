import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-precio',
  templateUrl: './filtro-precio.component.html',
  styleUrls: ['./filtro-precio.component.scss']
})
export class FiltroPrecioComponent implements OnInit {
  INTERVALO_RENTA = 1000;
  INTERVALO_COMPRA = 100000;

  @Input() tipoPrecio = 'Renta';

  @Input() preciomenor = 0;
  @Output() preciomenorChange = new EventEmitter<number>();

  @Input() preciomayor = 0;
  @Output() preciomayorChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  handleMenorChanges(value: string) {
    this.preciomenor = +(value.replace(/[^0-9.-]+/g, ''));
    this.preciomenorChange.emit(this.preciomenor);
  }

  handleMayorChanges(value: string) {
    this.preciomayor = +(value.replace(/[^0-9.-]+/g, ''));
    this.preciomayorChange.emit(this.preciomayor);
  }

  inputValidator(event: any) {
    // console.log(event.target.value);
    const pattern = /^[0-9]*$/;
    // let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9.]/g, '');
      // invalid character, prevent input

    }
  }

  aumentarMinimo() {
    if (this.tipoPrecio.toLowerCase() === 'renta') {
      this.preciomenor = this.preciomenor + this.INTERVALO_RENTA;
    } else {
      this.preciomenor = this.preciomenor + this.INTERVALO_COMPRA;
    }
    this.preciomenorChange.emit(this.preciomenor);
  }

  disminuirMinimo() {
    if (this.tipoPrecio.toLowerCase() === 'renta') {
      if (this.preciomenor - this.INTERVALO_RENTA < 0) {
        this.preciomenor = 0.0;
        return;
      }
      this.preciomenor = this.preciomenor - this.INTERVALO_RENTA;
    } else {
      if (this.preciomenor - this.INTERVALO_COMPRA < 0) {
        this.preciomenor = 0.0;
        return;
      }
      this.preciomenor = this.preciomenor - this.INTERVALO_COMPRA;
    }
    this.preciomenorChange.emit(this.preciomenor);
  }

  aumentarMaximo() {
    if (this.tipoPrecio.toLowerCase() === 'renta') {
      this.preciomayor = this.preciomayor + this.INTERVALO_RENTA;
    } else {
      this.preciomayor = this.preciomayor + this.INTERVALO_COMPRA;
    }
    this.preciomayorChange.emit(this.preciomayor);
  }

  disminuirMaximo() {
    if (this.tipoPrecio.toLowerCase() === 'renta') {
      if (this.preciomayor - this.INTERVALO_RENTA < 0) {
        this.preciomayor = 0.0;
        return;
      }
      this.preciomayor = this.preciomayor - this.INTERVALO_RENTA;
    } else {
      if (this.preciomayor - this.INTERVALO_COMPRA < 0) {
        this.preciomayor = 0.0;
        return;
      }
      this.preciomayor = this.preciomayor - this.INTERVALO_COMPRA;
    }
    this.preciomayorChange.emit(this.preciomayor);
  }

}
