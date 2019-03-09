import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wizard-alta-inmueble',
  templateUrl: './wizard-alta-inmueble.component.html',
  styleUrls: ['./wizard-alta-inmueble.component.scss']
})
export class WizardAltaInmuebleComponent implements OnInit {
  // @Input() message: string;
  // @Output() object = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  // sendMessage() {
  //   this.object.emit('Este es el nuevo mensaje');
  // }

}
