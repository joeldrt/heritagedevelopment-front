import { Component, OnInit, Input } from '@angular/core';
import { Propiedad } from 'src/app/models/propiedad';

@Component({
  selector: 'app-detalle-inmueble',
  templateUrl: './detalle-inmueble.component.html',
  styleUrls: ['./detalle-inmueble.component.scss']
})
export class DetalleInmuebleComponent implements OnInit {

  @Input() propiedadAMostrar: Propiedad;

  constructor() { }

  ngOnInit() {
  }

}
