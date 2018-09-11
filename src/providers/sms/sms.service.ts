import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(public api: Api) { }

  public sendSMS(sms: any) {
    return this.api.post('api/send/student/sms/', sms);
  }

  public sendEmail(email) {
    return this.api.post('api/send/student/email', email);
  }
}
