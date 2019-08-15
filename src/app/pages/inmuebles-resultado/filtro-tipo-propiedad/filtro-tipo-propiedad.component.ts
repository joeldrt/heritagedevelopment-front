import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  } from 'protractor';

@Component({
  selector: 'app-filtro-tipo-propiedad',
  templateUrl: './filtro-tipo-propiedad.component.html',
  styleUrls: ['./filtro-tipo-propiedad.component.scss']
})
export class FiltroTipoPropiedadComponent implements OnInit {
  posiblesTipos = ['Casa', 'Departamento', 'Oficina', 'Terreno'];
  posiblesTiposMarcados = [false, false, false, false];

  @Input() tiposPropiedadesSeleccionadas = [];
  @Output() tiposPropiedadesSeleccionadasChange = new EventEmitter<Array<string>>();

  constructor() { }

  ngOnInit() {
    this.posiblesTipos.forEach((item, index) => {
      if (this.tiposPropiedadesSeleccionadas && this.tiposPropiedadesSeleccionadas.indexOf(item) !== -1) {
        this.posiblesTiposMarcados[index] = true;
      }
    });
  }

  handleTipoPropiedadChanges(value: any) {
    this.tiposPropiedadesSeleccionadas = [];
    this.posiblesTipos.forEach((item, index) => {
      if (this.posiblesTiposMarcados[index]) {
        this.tiposPropiedadesSeleccionadas.push(item);
      }
    });
    this.tiposPropiedadesSeleccionadasChange.emit(this.tiposPropiedadesSeleccionadas);
  }

}
