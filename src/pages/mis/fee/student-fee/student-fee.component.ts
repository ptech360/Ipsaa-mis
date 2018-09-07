import {Component, OnInit} from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';

@Component({
  selector: 'app-student-fee',
  templateUrl: './student-fee.component.html',
  styleUrls: ['./student-fee.component.css']
})
export class StudentFeeComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  searchedStudent = '';
  selectedCenter = {id: 0};
  centers = [];
  studentFeeList = [];
  viewPanel = false;
  loadingFeeList = false;

  ngOnInit() {
    this.initiallize();
  }

  initiallize() {
    this.adminService
      .getCenters()
      .subscribe(centers => (this.centers = centers));
  }

  loadStudentFeeByCenter() {
    console.log(this.selectedCenter);
    this.loadingFeeList = true;
    this.adminService.loadStudentFeeByCenterId(this.selectedCenter.id)
    .subscribe(res => {
      this.studentFeeList = res;
      this.loadingFeeList = false;
    });
  }

  searchStudent() {}

  getStudentFee(student, mode) {
    //
  }
}
