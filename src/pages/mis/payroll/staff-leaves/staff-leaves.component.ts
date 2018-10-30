import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../providers/alert/alert.service';
import { PayrollService } from '../../../../providers/payroll/payroll.service';

@Component({
  selector: 'app-staff-leaves',
  templateUrl: './staff-leaves.component.html',
  styleUrls: ['./staff-leaves.component.css']
})
export class StaffLeavesComponent implements OnInit {
  selectedId: number;
  rowColour: string;
  currentDate: Date;
  employeeList: Array<any>;
  selectedEmployeeAttendanceDetails: Array<any>;
  constructor(
    private payrollService: PayrollService, private alertService: AlertService
  ) {
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.payrollService.getEmployee()
      .subscribe((res: any) => {
        this.employeeList = res;
      }, (err) => {
        this.alertService.errorAlert(err);
      });
  }
  getEmployeeAttendance() {

    this.payrollService.getAttendance({
      empId: this.selectedId,
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear()
    })
      .subscribe((res: any) => {
        this.getRowColour(res);
      }, (err) => {
        this.alertService.errorAlert(err);
      });
  }

  getRowColour(res) {

    res.forEach(day => {
      if (day.status === 'Holiday') {
        this.rowColour = 'table-primary' ;
      }
      if (day.status === 'Absent') {
        this.rowColour = 'table-danger' ;

      }
      if (day.status === 'Present') {
        this.rowColour = 'table-active' ;

      }
      if (day.status === 'Leave') {
        this.rowColour = 'table-secondary' ;

      }
      this.selectedEmployeeAttendanceDetails = res;

});
  }
}
