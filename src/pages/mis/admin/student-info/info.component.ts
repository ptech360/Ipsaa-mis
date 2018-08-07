import { Component, Input } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
@Component({
 selector: 'app-student-info',
 templateUrl: './info.component.html'
})
export class StudentInfoComponent {
 student: any;
 editable: boolean;
 @Input() set id(id: number) {
  this.adminService.getStudentById(id).subscribe((student: any) => {
   this.student = student;
  });
 }

 @Input() set update(update: boolean) {
  this.editable = update;
 }
 constructor(private adminService: AdminService) {

 }

 hideViewPanel() {
  this.adminService.viewPanel.next(false);
 }
}
