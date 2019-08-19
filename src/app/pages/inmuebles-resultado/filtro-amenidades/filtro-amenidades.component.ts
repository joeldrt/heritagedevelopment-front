import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AmenidadesService } from 'src/app/services/amenidades/amenidades.service';
import { Amenidades } from 'src/app/models/amenidades';

@Component({
  selector: 'app-filtro-amenidades',
  templateUrl: './filtro-amenidades.component.html',
  styleUrls: ['./filtro-amenidades.component.scss']
})
export class FiltroAmenidadesComponent implements OnInit {

  todasLasAmenidades: Array<string>;
  amenidadesSeleccionadas = [];

  @Input() amenidades = [];
  @Output() amenidadesChange = new EventEmitter<string[]>();

  constructor(
    private amenidadesService: AmenidadesService,
  ) {}

  ngOnInit() {
    this.amenidadesService.obtenerAmenidades().subscribe((document) => {
      const amenidadesDoc = (document.data() as Amenidades);
      if (amenidadesDoc.todas && amenidadesDoc.todas.length > 0) {
        this.amenidadesSeleccionadas = [];
        this.todasLasAmenidades = [];
        amenidadesDoc.todas.forEach((value, index) => {
          this.todasLasAmenidades.push(value);
          this.amenidadesSeleccionadas.push(false);
        });
      }
    });
  }

}
