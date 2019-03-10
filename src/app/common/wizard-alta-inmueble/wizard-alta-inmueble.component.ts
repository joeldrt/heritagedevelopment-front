import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wizard-alta-inmueble',
  templateUrl: './wizard-alta-inmueble.component.html',
  styleUrls: ['./wizard-alta-inmueble.component.scss']
})
export class WizardAltaInmuebleComponent implements OnInit {
  @Input() scrollableContanierId: string;
  // @Output() object = new EventEmitter<string>();

  // listaDeFotos = [];
  // urls = [];
  mapaDeArchivos = new Map<string, File>();
  mapaDeImagenes = new Map<string, string | ArrayBuffer>();

  imgURL: any;

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
    this.irIniciodePaginaDe();
  }

  finalizarPaso1() {
    this.numero_paso = 2;
    this.irIniciodePaginaDe();
  }

  finalizarPaso2() {
    this.numero_paso = 3;
    this.irIniciodePaginaDe();
  }

  uploadImage(event: any) {
    
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      if (this.mapaDeArchivos.size + filesAmount > 10) {
        console.error('número máximo de fotos');
        return;
      }

      for (let i = 0; i < filesAmount; i++) {
        // this.listaDeFotos.push(event.target.files[i]);
        // var reader = new FileReader();
        // reader.onload = (event) => {
        //   let target = event.target as FileReader;
        //   this.urls.push(target.result); 
        // }
        // reader.readAsDataURL(event.target.files[i]);

        this.mapaDeArchivos.set(event.target.files[i].name, event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (function(theFile: File, mapaDeImagenes: Map<string, string | ArrayBuffer>) {
          var fileName = theFile.name;
          return function(event) {
            let target = event.target as FileReader;
            mapaDeImagenes.set(fileName, target.result);
          };
        })(event.target.files[i], this.mapaDeImagenes);
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }



}
