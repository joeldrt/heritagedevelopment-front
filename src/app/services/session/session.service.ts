import { Injectable } from '@angular/core';
import {} from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  place: google.maps.places.PlaceResult;
  mapState: any;

  constructor() { }

  setPlace(place: google.maps.places.PlaceResult) {
    this.place = place;
  }

  getPlace(): google.maps.places.PlaceResult {
    return this.place;
  }
}
