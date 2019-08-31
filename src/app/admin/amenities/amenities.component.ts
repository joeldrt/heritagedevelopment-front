import { Component, OnInit } from '@angular/core';
import { AmenidadesService } from 'src/app/services/amenidades/amenidades.service';
import { HttpResponse } from '@angular/common/http';
import { Amenidades } from 'src/app/models/amenidades';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {

  objAmenidades: Amenidades;
  indiceAmenidadABorrar: number;
  isDirty = false;
  nuevaAmenidad: string;

  constructor(
    private amenidadesService: AmenidadesService,
  ) { }

  ngOnInit() {
    this.amenidadesService.obtenerAmenidadesStrapi().subscribe(
      (response: HttpResponse<Amenidades>) => {
        const amenidadesObj = response.body;
        this.objAmenidades = amenidadesObj;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  subir(index: number) {
    if ((index - 1) < 0) {
      console.error('index out of bounds');
      return;
    }
    const swappingObject = this.objAmenidades.todas[index - 1];
    this.objAmenidades.todas[index - 1] = this.objAmenidades.todas[index];
    this.objAmenidades.todas[index] = swappingObject;
    this.isDirty = true;
  }

  bajar(index: number) {
    if ((index + 1) > this.objAmenidades.todas.length - 1) {
      console.error('index out of bounds');
      return;
    }
    const swappingObject = this.objAmenidades.todas[index + 1];
    this.objAmenidades.todas[index + 1] = this.objAmenidades.todas[index];
    this.objAmenidades.todas[index] = swappingObject;
    this.isDirty = true;
  }

  seleccionarAmenidadABorrar(index: number) {
    console.log(`indice amenidad a borrar: ${index}`);
    this.indiceAmenidadABorrar = index;
  }

  hacerBorrardo() {
    if (!this.indiceAmenidadABorrar) {
      console.error('no hay un indice seleccionado');
      return;
    }
    this.borrar(this.indiceAmenidadABorrar);
    this.actualizarAmenidades();
  }

  borrar(index: number) {
    if (index < 0 || index > this.objAmenidades.todas.length - 1) {
      console.error('index out of bounds');
      return;
    }
    this.objAmenidades.todas.splice(index, 1);
    this.isDirty = true;
  }

  actualizarAmenidades() {
    this.amenidadesService.actualizarAmenidadesStrapi(this.objAmenidades).subscribe(
      (resposne: HttpResponse<Amenidades>) => {
        this.isDirty = false;
        this.objAmenidades = resposne.body;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  agregarAmenidad() {
    if (!this.nuevaAmenidad || this.nuevaAmenidad.trim().length === 0) {
      console.error('el nombre de la amenidad está vacío');
    }
    this.objAmenidades.todas.push(this.nuevaAmenidad);
    this.actualizarAmenidades();
  }

}
