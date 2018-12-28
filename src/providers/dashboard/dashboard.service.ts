import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Student } from '../../modal/student';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Staff } from '../../modal/staff';
import { Center } from '../../modal/center';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  students: Student[];
  staff: Staff[];
  centers: Center[];
  constructor(public api: Api) {}

  getDashboardTabs() {
    return this.api.get('api/dash/');
  }

  getZones() {
    return this.api.get('api/zone/');
  }

  getCities() {
    return this.api.get('api/city/');
  }

  getStates() {
    return this.api.get('api/state/all');
  }

  getCenters() {
    return this.api.get('api/center/');
  }

  getCitiesByZone(zone: string) {
    return this.api.get('api/city/?zone=' + zone);
  }

  getCenterByZone(zone: string) {
    return this.api.get('api/center/?zone=' + zone);
  }

  getCentersByCity(city: string) {
    return this.api.get('api/center/?city=' + city);
  }

  getStats(body: any) {
    return this.api.post('api/stats/', body);
  }

  getFee(timestamp: any) {
    return this.api.post('api/stats/fee', timestamp);
  }

  getStudents(object) {
    return this.api.post('api/dash/student', object);
  }

  getStaff(object) {
    if (this.staff) {
      return of(this.staff);
    }
    return this.api.post('api/dash/staff', object).map((response: any) => {
      this.staff = response;
      return response;
    });
  }

  getCenterList() {
    if (this.centers) {
      return of(this.centers);
    }
    return this.api.get('api/center/').map((response: any) => {
      this.centers = response;
      return response;
    });
  }

  getStudentFee(body: any) {
    return this.api.post('api/dash/studentfee', body);
  }

  getFollowups() {
    return this.api.post('api/dash/followupreport', {});
  }



  getFilterStaff(filterBy, data) {
return this.api.post('api/dash/' + filterBy , data);
  }
}
