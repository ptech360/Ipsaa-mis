import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Student } from '../../modal/student';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  students: Student[];
  public viewPanel = new Subject<boolean>();

  constructor(public api: Api) {}

  getPrograms() {
    return this.api.get('api/program/');
  }

  getCenters() {
    return this.api.get('api/center/');
  }

  getGroups() {
    return this.api.get('api/group/');
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

  getPrivileges() {
    return this.api.get('api/user/my_privileges');
  }

  uploadStudentProfilePic(studentId: number, formData: FormData) {
    return this.api.post('api/student/' + studentId + '/profile-pic', formData);
  }

  updateStudent(student: any) {
    return this.api.put('api/student/', student);
  }
}
