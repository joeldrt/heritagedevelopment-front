import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Propiedad } from '../../models/propiedad';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  obtenerPropiedades() {
    return this.firestore.collection<Propiedad>('propiedades').snapshotChanges();
  }

  agregarPropiedad(propiedad: Propiedad) {
    delete propiedad.id;
    return this.firestore.collection<Propiedad>('propiedades').add(propiedad);
  }

  actualizarPropiedad(propiedad: Propiedad) {
    const propiedad_id = propiedad.id;
    delete propiedad.id;
    this.firestore.doc('propiedades/' + propiedad_id).update(propiedad);
  }

  borrarPropiedad(propiedad_id: string) {
    this.firestore.doc('propiedades/' + propiedad_id).delete();
  }

  obtenerPropiedad(propiedad_id: string) {
    return this.firestore.doc<Propiedad>('propiedades/' + propiedad_id);
  }

}
