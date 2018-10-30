import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(public api: Api) { }

  getSalary() {
    return this.api.get('api/employee/salary');
  }

  getSalaryByEmployee(eid: any) {
    return this.api.get('api/employee/' + eid + '/salary');
  }
}
