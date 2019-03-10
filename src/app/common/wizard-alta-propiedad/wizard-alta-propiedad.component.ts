import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wizard-alta-propiedad',
  templateUrl: './wizard-alta-propiedad.component.html',
  styleUrls: ['./wizard-alta-propiedad.component.scss']
})
export class WizardAltaPropiedadComponent implements OnInit {
  @Input() scrollableContanierId: string;
  // @Output() object = new EventEmitter<string>();

  // listaDeFotos = [];
  // urls = [];
  mapaDeArchivos = new Map<string, File>();
  mapaDeImagenes = new Map<string, string | ArrayBuffer>();

  imgURL: any;

  numero_paso = 3;

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

  finalizarPaso3() {
    this.numero_paso = 4;
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

  borrarImagen(imagen_key: string) {
    this.mapaDeArchivos.delete(imagen_key);
    this.mapaDeImagenes.delete(imagen_key);
  }

}
