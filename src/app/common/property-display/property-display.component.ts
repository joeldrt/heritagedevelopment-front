import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Propiedad } from 'src/app/models/propiedad';

@Component({
  selector: 'app-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.scss']
})
export class PropertyDisplayComponent implements OnInit {
  @Input() propiedad: Propiedad;
  @Input() mapaDeImagenes: Map<string, string | ArrayBuffer>;

  constructor() { }

  ngOnInit() {
  }

}
