import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit, AfterViewInit {
  @Input() strictBounds = false;
  @Output() setAddress: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
        {
            bounds: new google.maps.LatLngBounds(
              new google.maps.LatLng(18.842749,  -98.471144),
              new google.maps.LatLng(19.133659,  -98.024678)
            ),
            componentRestrictions: this.strictBounds ? { country: 'MX' } : null, // restringir busqueda en México de ser true.
            types: ['geocode'],  // 'establishment' / 'address' / 'geocode' -- muestra colonias y zonas
            strictBounds: this.strictBounds, // de ser true en este momento solo muestra resultados en el área de puebla.
        });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.invokeEvent(place);
    });
  }

  invokeEvent(place: google.maps.places.PlaceResult) {
      this.setAddress.emit(place);
  }

}
