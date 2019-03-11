import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateComponent implements OnInit {

  filters = [
    new PropertyFilter('nombre', 'nombre'),
    new PropertyFilter('m2 terreno', 'm2t.'),
    new PropertyFilter('m2 construcción', 'm2c.'),
    new PropertyFilter('niveles', 'niv.'),
  ]
  filter: PropertyFilter;

  end_wizard = false;
  wizardIniciado = false;

  constructor() { 
    this.filter = new PropertyFilter('', '');
  }

  ngOnInit() {
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
