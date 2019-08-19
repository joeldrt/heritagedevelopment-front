import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Amenidades } from 'src/app/models/amenidades';

@Injectable({
  providedIn: 'root'
})
export class AmenidadesService {

  constructor(
    private firestore: AngularFirestore,
  ) {}

  obtenerAmenidades() {
    return this.firestore.collection('amenidades').doc('Bwd2nbFbxqEsi1w3EoYn').get();
  }

}
