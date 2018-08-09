import { Injectable, Inject } from '@angular/core';
import swal from 'sweetalert';
@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor() {}

  successAlert(msg: string) {
    swal({
      title: 'Success',
      text: msg,
      icon: 'success'
    });
  }

  errorAlert(msg: string) {
    swal({
      title: 'Error',
      text: msg,
      icon: 'error'
    });
  }
}
