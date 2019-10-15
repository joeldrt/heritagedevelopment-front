import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
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
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.propiedad) {
      this.initMap();
    }
    if (this.propiedad && this.propiedad.urlsFotografias) {
      this.galleryImages = [];
      this.galleryOptions = [
          {
              width: '100%',
              height: '300px',
              thumbnailsColumns: 4,
              imageAnimation: NgxGalleryAnimation.Slide
          },
          // max-width 800
          {
              // breakpoint: 800,
              width: '100%',
              height: '600px',
              imagePercent: 80,
              thumbnailsPercent: 20,
              thumbnailsMargin: 20,
              thumbnailMargin: 20
          },
          // max-width 400
          // {
          //     breakpoint: 400,
          //     preview: false
          // }
      ];
      this.propiedad.urlsFotografias.forEach(
        (currentUrl) => {
          this.galleryImages.push({ small: currentUrl, medium: currentUrl, big: currentUrl });
        }
      );
    }
  }

  initMap() {
    if (!this.mapElement) {
      setTimeout(() => {
        this.initMap();
      }, 396);
      return;
    }
    const mapProperties = {
      center: new google.maps.LatLng(this.propiedad.latitud, this.propiedad.longitud),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      fullscreenControl: true,
      gestureHandling: 'none' as google.maps.GestureHandlingOptions,
    };
    if (this.map) {
      if (this.infoWindow) {
        this.infoWindow.close();
      }
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.map.setCenter(new google.maps.LatLng(this.propiedad.latitud, this.propiedad.longitud));
    } else {
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    }
    const markerProperties = {
      position: new google.maps.LatLng(this.propiedad.latitud, this.propiedad.longitud),
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
