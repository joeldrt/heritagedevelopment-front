import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickStopPropagation]'
})
export class ClickStopPropagationDirective {

  @HostListener('click', ['$event'])
    public onClick(event: any): void {
      if (event.target.className.indexOf('dont-stop-propagation') === -1) {
        event.stopPropagation();
      }
    }

}
