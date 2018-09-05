import {Component, OnInit} from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';

@Component({
  selector: 'app-student-fee',
  templateUrl: './student-fee.component.html',
  styleUrls: ['./student-fee.component.css']
})
export class StudentFeeComponent implements OnInit {

  constructor( private adminService: AdminService ) {}
  searchedStudent = '';
  selectedCenter = 'ALL';
  centers = [];
  centerChanged() {
    // this.adminService.getStudents
  }

  searchStudent() { }

  initiallize() {
    this.adminService.getCenters()
    .subscribe( centers => this.centers = centers);
  }

  ngOnInit() {
    this.initiallize();
  }
}
