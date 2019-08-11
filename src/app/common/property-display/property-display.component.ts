import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Propiedad } from 'src/app/models/propiedad';
import {} from 'googlemaps';

@Component({
  selector: 'app-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.scss']
})
export class PropertyDisplayComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() propiedad: Propiedad;
  @Input() mapaDeImagenes: Map<string, string | ArrayBuffer>;
  @ViewChild('map') mapElement: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;
  infoWindow: google.maps.InfoWindow;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.propiedad) {
      this.initMap();
    }
  }

  initMap() {
    if (!this.mapElement) {
      setTimeout(() => {
        this.initMap();
      }, 500);
      return;
    }
    const mapProperties = {
      center: new google.maps.LatLng(this.propiedad.coordinates.latitude, this.propiedad.coordinates.longitude),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      fullscreenControl: true,
      gestureHandling: 'none' as google.maps.GestureHandlingOptions,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    const markerProperties = {
      position: new google.maps.LatLng(this.propiedad.coordinates.latitude, this.propiedad.coordinates.longitude),
      map: this.map,
      draggable: false,
      title: this.propiedad.direccion ? this.propiedad.direccion : '',
    };
    this.marker = new google.maps.Marker(markerProperties);
    const infoWindowOptions = {
      content: this.propiedad.direccion ? this.propiedad.direccion : '',
    };
    this.infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    this.infoWindow.open(this.map, this.marker);
  }

}
