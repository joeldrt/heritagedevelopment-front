import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Propiedad } from '../../models/propiedad';
import Geohash from 'latlon-geohash';
import { GeoCollectionReference, GeoFirestore} from 'geofirestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  geofirestore$: GeoFirestore;
  geocollection: GeoCollectionReference;

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.geofirestore$ = new GeoFirestore(firestore.firestore);
    this.geocollection = this.geofirestore$.collection('propiedades');
  }

  obtenerPropiedades() {
    return this.geofirestore$.collection('propiedades');
  }

  agregarPropiedad(propiedad: any) {
    return this.geocollection.doc(propiedad.id).set(propiedad);
  }

  actualizarPropiedad(propiedad: Propiedad) {
    return this.geocollection.doc(propiedad.id).update(propiedad);
  }

  borrarPropiedad(propiedadId: string) {
    return this.geocollection.doc(propiedadId).delete();
  }

  obtenerPropiedad(propiedadId: string) {
    return this.geocollection.doc(propiedadId);
  }

  obtenerPropiedadesCercanasA(latitude: number, longitude: number) {
    return  this.geocollection.near({
      center: new firebase.firestore.GeoPoint(latitude, longitude),
      radius: 30,
    }).get();
  }

  generarGeohash(latitude: number, longitude: number): string {
    return Geohash.encode(latitude, longitude, 9);
  }

}
