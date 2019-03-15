import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { Propiedad } from '../../models/propiedad';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateComponent implements OnInit, OnDestroy {
  @ViewChild('propertyResultArea') propertyResultArea: ElementRef;
  lastResultAreaScrollPosition: number;

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
    private _location: Location,
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
        setTimeout(this.setLastScrollPosition, 1);
      }
    );
  }

  ngOnDestroy() {
    localStorage.setItem('lastAdminPropertyResultAreaScrollPosition', this.lastResultAreaScrollPosition.toString());
  }

  setLastScrollPosition() {
    const scrollTo = +localStorage.getItem('lastAdminPropertyResultAreaScrollPosition');
    if (scrollTo > 0 && document.getElementById('propertyResultArea')) {
      // this.propertyResultArea.nativeElement.innerHTML.scrollTop = scrollTo;
      document.getElementById('propertyResultArea').scrollTop = scrollTo;
      localStorage.removeItem('lastAdminPropertyResultAreaScrollPosition');
    }
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

  navigatePrevious() {
    this._location.back();
  }

  cerrarWizardAgregarPropiedad() {
    this.wizardIniciado = false;
  }

  @HostListener('scroll', ['$event']) scrollHandler(event: any) {
    this.lastResultAreaScrollPosition = event.target.scrollTop;
    // console.debug(event.target.scrollTop);
  }

}

class PropertyFilter {
  constructor(
    public nombre: string,
    public short_name: string,
  ) {}
}
