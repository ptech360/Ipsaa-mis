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

  getEmployee() {
    return this.api.get('api/staff/reporting/');
  }

  getAttendance(employeeId) {
    return this.api.post('api/attendance/staff/', employeeId);
  }
}
