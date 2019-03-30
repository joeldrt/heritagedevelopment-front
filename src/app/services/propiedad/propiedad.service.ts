import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Propiedad } from '../../models/propiedad';
import * as firebase from 'firebase/app';

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

  obtenerPropiedadesCercanasA(latitude: number, longitude: number, distance: number) {
    // ~1 mile of lat and lon in degrees
    const lat = 0.0144927536231884;
    const lon = 0.0181818181818182;

    const lowerLat = latitude - (lat * distance);
    const lowerLon = longitude - (lon * distance);

    const greaterLat = latitude + (lat * distance);
    const greaterLon = longitude + (lon * distance);

    const lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLon);
    const greaterGeopoint = new firebase.firestore.GeoPoint(greaterLat, greaterLon);

    return this.firestore.collection<Propiedad>('propiedades', ref => ref.where(
      'geoposicion', '>', lesserGeopoint
    ).where(
      'geoposicion', '<=', greaterGeopoint
    )).snapshotChanges();
  }

}
