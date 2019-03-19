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

  agregarPropiedad(propiedad: any) {
    return this.firestore.collection<Propiedad>('propiedades').doc(propiedad.id).set(propiedad);
  }

  actualizarPropiedad(propiedad: Propiedad) {
    return this.firestore.doc<Propiedad>(`propiedades/${propiedad.id}`).update(propiedad);
  }

  borrarPropiedad(propiedadId: string) {
    return this.firestore.doc(`propiedades/${propiedadId}`).delete();
  }

  obtenerPropiedad(propiedadId: string) {
    return this.firestore.doc<Propiedad>(`propiedades/${propiedadId}`);
  }

}
