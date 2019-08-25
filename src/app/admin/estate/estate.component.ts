import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { Propiedad } from '../../models/propiedad';
import { Location } from '@angular/common';
import { GeoQuerySnapshot } from 'geofirestore';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateComponent implements OnInit, OnDestroy {
  @ViewChild('propertyResultArea') propertyResultArea: ElementRef;
  lastResultAreaScrollPosition: number;

  propiedades: Propiedad[];

  endWizard = false;
  wizardIniciado = false;

  constructor(
    private propiedadService: PropiedadService,
    private location: Location,
  ) {
    this.propiedades = new Array<Propiedad>();
  }

  ngOnInit() {
    this.propiedadService.obtenerPropiedades().onSnapshot(
      (snapshot: GeoQuerySnapshot) => {
        this.propiedades = new Array<Propiedad>();
        snapshot.docs.forEach((value) => {
          this.propiedades.push((value.data() as Propiedad));
        });
        setTimeout(this.setLastScrollPosition, 1);
      }
    );
  }

  ngOnDestroy() {
    if (this.lastResultAreaScrollPosition) {
      localStorage.setItem('lastAdminPropertyResultAreaScrollPosition', this.lastResultAreaScrollPosition.toString());
    }
  }

  setLastScrollPosition() {
    const scrollTo = +localStorage.getItem('lastAdminPropertyResultAreaScrollPosition');
    if (scrollTo > 0 && document.getElementById('propertyResultArea')) {
      // this.propertyResultArea.nativeElement.innerHTML.scrollTop = scrollTo;
      document.getElementById('propertyResultArea').scrollTop = scrollTo;
      localStorage.removeItem('lastAdminPropertyResultAreaScrollPosition');
    }
  }

  haFinalizadoElWizard($event: any) {
    this.endWizard = $event;
  }

  iniciarWizardAgregarPropiedad() {
    this.wizardIniciado = true;
    this.endWizard = false;
  }

  finalizarWizardAgregarPropiedad() {
    this.wizardIniciado = false;
  }

  navigatePrevious() {
    this.location.back();
  }

  cerrarWizardAgregarPropiedad() {
    this.wizardIniciado = false;
  }

  @HostListener('scroll', ['$event']) scrollHandler(event: any) {
    this.lastResultAreaScrollPosition = event.target.scrollTop;
    // console.debug(event.target.scrollTop);
  }

}
