import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateComponent implements OnInit {

  filters = [
    new PropertyFilter('nombre', 'nombre'),
    new PropertyFilter('m2 terreno', 'm2t.'),
    new PropertyFilter('m2 construcción', 'm2c.'),
    new PropertyFilter('niveles', 'niv.'),
  ]
  filter: PropertyFilter;

  constructor() { 
    this.filter = new PropertyFilter('', '');
  }

  ngOnInit() {
  }

  changeFilter(new_filter: PropertyFilter) {
    this.filter = new_filter;
  }

}

class PropertyFilter {
  constructor(
    public nombre: string,
    public short_name: string,
  ) {}
}
