import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PropiedadService } from '../../services/propiedad/propiedad.service';
import { Propiedad } from 'src/app/models/propiedad';
import { ToastrService } from '../../services/toastr/toastr.service'
import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property_id: string;

  private propiedadDoc: AngularFirestoreDocument<Propiedad>;
  propiedad: Observable<Propiedad>;

  constructor(
    private route: ActivatedRoute,
    private propiedadService: PropiedadService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.property_id = this.route.snapshot.paramMap.get("property_id");
    this.cargarPropiedad(this.property_id);
  }

  cargarPropiedad(property_id: string) {
    this.propiedadDoc = this.propiedadService.obtenerPropiedad(property_id);
    this.propiedad = this.propiedadDoc.valueChanges();
  }

}
