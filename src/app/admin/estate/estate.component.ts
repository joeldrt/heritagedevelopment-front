import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { Propiedad } from '../../models/propiedad';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateComponent implements OnInit {

  propiedades: Propiedad[];

  filters = [
    new PropertyFilter('nombre', 'nombre'),
    new PropertyFilter('m2 terreno', 'm2t.'),
    new PropertyFilter('m2 construcción', 'm2c.'),
    new PropertyFilter('niveles', 'niv.'),
  ]
  filter: PropertyFilter;

  end_wizard = false;
  wizardIniciado = false;

  constructor(
    private propiedadService: PropiedadService,
  ) { 
    this.filter = new PropertyFilter('', '');
  }

  ngOnInit() {
    this.propiedadService.obtenerPropiedades().subscribe(
      actionArray => {
        this.propiedades = actionArray.map(
          item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Propiedad;
          }
        )
      }
    );
  }

  changeFilter(new_filter: PropertyFilter) {
    this.filter = new_filter;
  }

  haFinalizadoElWizard($event: any) {
    this.end_wizard = $event;
  }

  iniciarWizardAgregarPropiedad() {
    this.wizardIniciado = true;
    this.end_wizard = false;
  }

  finalizarWizardAgregarPropiedad() {
    this.wizardIniciado = false;
  }

}

class PropertyFilter {
  constructor(
    public nombre: string,
    public short_name: string,
  ) {}
}
