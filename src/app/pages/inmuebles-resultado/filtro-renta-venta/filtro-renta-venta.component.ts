import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-renta-venta',
  templateUrl: './filtro-renta-venta.component.html',
  styleUrls: ['./filtro-renta-venta.component.scss']
})
export class FiltroRentaVentaComponent implements OnInit {
  @Input() rentaventa = 'Renta';
  @Output() rentaventaChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  handleValueChanges(value: any) {
    this.rentaventa = value.target.defaultValue;
    this.rentaventaChange.emit(this.rentaventa);
  }

}
