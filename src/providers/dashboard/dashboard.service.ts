import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable({providedIn: 'root'})
export class DashboardService {
 constructor(public api: Api) {

 }

 getZones() {
  return this.api.get('api/zone/');
 }

 getCities() {
  return this.api.get('api/city/');
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
}
