import { Component, OnInit, Input } from '@angular/core';
import { Propiedad } from 'src/app/models/propiedad';

@Component({
  selector: 'app-my-property-detail',
  templateUrl: './my-property-detail.component.html',
  styleUrls: ['./my-property-detail.component.scss']
})
export class MyPropertyDetailComponent implements OnInit {
  @Input() propiedadAMostrar: Propiedad;

  constructor() { }

  ngOnInit() {
  }

}
