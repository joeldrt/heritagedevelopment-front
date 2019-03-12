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
    const doc_id = this.firestore.createId();
    propiedad.id = doc_id;
    return this.firestore.collection<Propiedad>('propiedades').doc(doc_id).set(propiedad);
  }

  actualizarPropiedad(propiedad: Propiedad) {
    const propiedad_id = propiedad.id;
    delete propiedad.id;
    this.firestore.doc('propiedades/' + propiedad_id).update(propiedad);
  }

  borrarPropiedad(propiedad_id: string) {
    this.firestore.doc('propiedades/' + propiedad_id).delete();
  }

}