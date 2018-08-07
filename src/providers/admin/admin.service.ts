import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Student } from '../../modal/student';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AdminService {
 students: Student[];
 public viewPanel = new Subject<boolean>();

 constructor(public api: Api) {

 }

 getPrograms() {
  return this.api.get('api/program/');
 }

 getStudents(body: any) {
  return this.api.post('api/student/filter', body);
 }

 getStudentById(studentId: number) {
  return this.api.get('api/student/' + studentId);
 }

 deleteStudentById(studentId: number) {
  return this.api.delete('api/student/' + studentId);
 }

}
