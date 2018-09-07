import {Component, OnInit} from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { PagerService } from '../../../../providers/pagination/pager.service';

@Component({
  selector: 'app-student-fee',
  templateUrl: './student-fee.component.html',
  styleUrls: ['./student-fee.component.css']
})

export class StudentFeeComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private pagerService: PagerService
  ) {}

  searchedStudent = '';
  selectedCenter = {id: 0};
  centers = [];
  studentFeeList = [];
  viewPanel = false;
  loadingFeeList = false;
  pager: any = []; // object for pagination config generated from service
  pagedItems = []; // paginated items will be stored here


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
