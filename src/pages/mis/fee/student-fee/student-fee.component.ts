import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { PagerService } from '../../../../providers/pagination/pager.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-fee',
  templateUrl: './student-fee.component.html',
  styleUrls: ['./student-fee.component.css']
})

export class StudentFeeComponent implements OnInit {
  constructor(
    private adminService: AdminService,

  ) { }

  searchedStudent = '';
  selectedCenter = { id: 0 };
  centers = [];
  selectedStudentDetails: any = {};
  studentFeeDetails = [];
  viewPanel = false;
  loadingFeeList = false;
  allItems = [];
  ngOnInit() {
    this.initiallize();
    this.subscribSidePanel();
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
        this.studentFeeDetails = res;
        this.allItems = res;
        this.loadingFeeList = false;
      });
  }

  searchStudent(event: any) {
    const val = event.target.value.toLowerCase();
    if (val && val.trim() !== '') {
      this.studentFeeDetails = this.allItems.filter(student => {
        return student.fullName.toLowerCase().startsWith(val);
      });
    } else {
      this.studentFeeDetails = this.allItems;
    }
  }

  getStudentFee(student) {
    this.selectedStudentDetails = (student) ? student : {};
    this.showSidePanel();

  }




  showSidePanel() {

    this.adminService.viewPanel.next(true);
  }


  subscribSidePanel = () => {
    this.adminService.viewPanel.subscribe(value => {
      this.viewPanel = value;
      console.log(value + 'subscribe');
    });
  }

}
