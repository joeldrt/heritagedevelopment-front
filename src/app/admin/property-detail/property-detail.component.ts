import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { Propiedad } from 'src/app/models/propiedad';
import { ToastrService } from '../../services/toastr/toastr.service';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { GeoDocumentSnapshot } from 'geofirestore';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  propertyId: string;

  private propiedadDoc: AngularFirestoreDocument<Propiedad>;
  propiedad: Propiedad;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private propiedadService: PropiedadService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.cargarPropiedad(this.propertyId);
  }

  navigatePrevious() {
    this.location.back();
  }

  cargarPropiedad(propertyId: string) {
    this.propiedadService.obtenerPropiedad(propertyId).onSnapshot((snapshot: GeoDocumentSnapshot) => {
      this.propiedad = snapshot.data() as Propiedad;
    });
  }

}
