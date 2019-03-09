import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mensaje_componente: string;

  constructor() { }

  ngOnInit() {
  }

  actualizarMensaje($event: any) {
    this.mensaje_componente = $event;
  }

}
