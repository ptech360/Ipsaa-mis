import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { AlertService } from '../../../../providers/alert/alert.service';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {
  attendance: any[] = [];

  constructor(private adminService: AdminService, private alertService: AlertService) { }

  ngOnInit() {
    this.getStudentAttendance();
  }

  getStudentAttendance() {
    this.adminService.getStudentAttendance().subscribe((response: any[]) => {
      this.attendance = response;
    });
  }

  clockin(student: any) {
    student.clockinDisabled = true;
    this.adminService.clockInStudent(student).subscribe((response: any) => {
      student.clockinDisabled = false;
                this.alertService.successAlert('Clock in OK');
    });
  }

  clockOut(student: any) {
    student.clockoutDisabled = true;
    this.adminService.clockOutStudent(student).subscribe((response: any) => {
      student.clockoutDisabled = false;
      this.alertService.successAlert('Clock out OK');
    });
  }

}
