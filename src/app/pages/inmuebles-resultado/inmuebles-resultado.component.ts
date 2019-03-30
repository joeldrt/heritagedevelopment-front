import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { Propiedad } from '../../models/propiedad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inmuebles-resultado',
  templateUrl: './inmuebles-resultado.component.html',
  styleUrls: ['./inmuebles-resultado.component.scss']
})
export class InmueblesResultadoComponent implements OnInit {

  place: google.maps.places.PlaceResult;
  propiedades: Propiedad[];

  constructor(
    private sessionService: SessionService,
    private propiedadService: PropiedadService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.place = this.sessionService.getPlace();
    if (!this.place) {
      this.router.navigate(['inmuebles']);
      return;
    }
    this.showResults();
  }

  showResults() {
    console.log(this.place);
    this.propiedadService.obtenerPropiedadesCercanasA(this.place.geometry.location.lat(), this.place.geometry.location.lng(), 4).subscribe(
      actionArray => {
        this.propiedades = actionArray.map(
          item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Propiedad;
          }
        );
      }
    );
  }

}
