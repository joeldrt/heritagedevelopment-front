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
    const propiedadId = propiedad.id;
    delete propiedad.id;
    return this.firestore.doc<Propiedad>('propiedades/' + propiedadId).update(propiedad);
  }

  borrarPropiedad(propiedadId: string) {
    return this.firestore.doc('propiedades/' + propiedadId).delete();
  }

  obtenerPropiedad(propiedadId: string) {
    return this.firestore.doc<Propiedad>('propiedades/' + propiedadId);
  }

}
