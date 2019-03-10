import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wizard-alta-inmueble',
  templateUrl: './wizard-alta-inmueble.component.html',
  styleUrls: ['./wizard-alta-inmueble.component.scss']
})
export class WizardAltaInmuebleComponent implements OnInit {
  @Input() scrollableContanierId: string;
  // @Output() object = new EventEmitter<string>();

  numero_paso = 1;

  constructor() { }

  ngOnInit() {
  }

  // sendMessage() {
  //   this.object.emit('Este es el nuevo mensaje');
  // }

  irIniciodePaginaDe() {
    var aTag = document.getElementById(this.scrollableContanierId);
    if (aTag) {
        aTag.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  pasoAnterior() {
    this.numero_paso--;
  }

  finalizarPaso1() {
    this.numero_paso = 2;
    this.irIniciodePaginaDe();
  }

  finalizarPaso2() {
    this.numero_paso = 2;
  }

}
