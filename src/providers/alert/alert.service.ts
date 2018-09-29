import { Injectable, Inject } from '@angular/core';
import swal from 'sweetalert';
@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor() {}

  public confirm(msg: string) {
    return swal({
      title: 'Are you sure?',
      text: msg,
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    });
  }

  public successAlert(msg: string) {
    swal({
      title: 'Success',
      text: msg,
      icon: 'success'
    });
  }

  public errorAlert(msg: string) {
    swal({
      title: 'Error',
      text: msg,
      icon: 'error'
    });
  }
}
