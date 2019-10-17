import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.scss']
})
export class InmueblesComponent implements OnInit, AfterViewInit {
  @ViewChild('addressInput') addressInput: any;

  backgroundIndex = 0;
  posibleBackgrounds = [
    'assets/images/backgrounds/francesca-tosolini-tHkJAMcO3QE-unsplash.jpg',
    'assets/images/backgrounds/joshua-ness-Vo52cKzOxMY-unsplash.jpg',
    'assets/images/backgrounds/chuttersnap-awL_YCtPGv4-unsplash.jpg',
    'assets/images/backgrounds/douglas-sheppard-9rYfG8sWRVo-unsplash.jpg'];
  backgroundImage = 'assets/images/backgrounds/douglas-sheppard-9rYfG8sWRVo-unsplash.jpg';

  place: google.maps.places.PlaceResult;
  searchEmpty = false;

  constructor(
    private zone: NgZone,
    private sessionService: SessionService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.starBackgroundAnimation();
  }

  ngAfterViewInit() {
    this.createAutocompleteInput();
  }

  starBackgroundAnimation() {
    setInterval(() => {
      this.backgroundImage = this.posibleBackgrounds[this.backgroundIndex];
      this.backgroundIndex += 1;
      if (this.backgroundIndex > this.posibleBackgrounds.length - 1) {
        this.backgroundIndex = 0;
      }
    }, 12600);
  }

  createAutocompleteInput() {
    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement,
      {
          // bounds: new google.maps.LatLngBounds(
          //   new google.maps.LatLng(18.842749,  -98.471144),
          //   new google.maps.LatLng(19.133659,  -98.024678)
          // ),
          componentRestrictions: { country: 'MX' },
          types: [],  // 'establishment' / 'address' / 'geocode' -- muestra colonias y zonas
          strictBounds: false, // true limitado a puebla - false limitado a país méxico
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.place = autocomplete.getPlace();
        this.searchEmpty = false;
        this.zone.run(() => {
          this.buscarPropiedades();
        });
    });
  }

  buscarPropiedades() {
    if (!this.place) {
      this.searchEmpty = true;
      return;
    }
    this.sessionService.setPlace(this.place);
    this.storageService.saveData(StorageService.SAVED_PLACE, this.place);
    this.router.navigate(['inmuebles/resultados']);
  }

}
