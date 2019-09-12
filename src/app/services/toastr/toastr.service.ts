import { Injectable } from '@angular/core';
declare var toastr: any;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() {
    this.configuration();
  }

  success(message: string, title?: string) {
    toastr.success(message, title);
  }

  warning(message: string, title?: string) {
    toastr.warning(message, title);
  }

  error(message: string, title?: string) {
    toastr.error(message, title);
  }

  info(message: string, title?: string) {
    toastr.info(message, title);
  }

  configuration() {
    toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': false,
      'progressBar': true,
      'positionClass': 'toast-bottom-right',
      'preventDuplicates': false,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '3000',
      'timeOut': '5100',
      'extendedTimeOut': '1500',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
  }
}
