import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html'
})
export class AppStaffComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  loading = true;
  centers: any;
  selectedCenter: any = 'all';
  staffType: object[] = [
    { name: 'CxO', value: 'CxO' },
    { name: 'Management', value: 'Management' },
    { name: 'Teacher', value: 'Teacher' },
    { name: 'Staff', value: 'Staff' }
  ];
  search: string;
  selectedStaffStatus: any = 'true';
  selectedStaffType: any = 'all';
  viewPanel = false;

  ngOnInit() {
    // setting centers response from backend
    this.adminService.getCenter().subscribe(response => {
      this.centers = response;
      this.loading = false;
    });
  }

  searchStaff() {
    console.log(this.search);
  }

  addStaff() {
      //
  }
}
