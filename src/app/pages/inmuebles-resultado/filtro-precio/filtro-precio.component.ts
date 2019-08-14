import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-precio',
  templateUrl: './filtro-precio.component.html',
  styleUrls: ['./filtro-precio.component.scss']
})
export class FiltroPrecioComponent implements OnInit {
  @Input() preciomenor = 0;
  @Output() preciomenorChange = new EventEmitter<number>();

  @Input() preciomayor = 0;
  @Output() preciomayorChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  handleMenorChanges(value: number) {
    this.preciomenor = value;
    this.preciomenorChange.emit(this.preciomenor);
  }

  handleMayorChanges(value: number) {
    this.preciomayor = value;
    this.preciomayorChange.emit(this.preciomayor);
  }

}
