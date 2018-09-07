import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as _ from 'underscore';
import { AlertService } from '../../../../providers/alert/alert.service';
declare let $: any;

@Component({
  selector: 'app-staff-info',
  templateUrl: './staffInfo.component.html',
  styleUrls: ['./staffInfo.component.css']
})
export class StaffInfoComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  staff: any = {};
  editable: boolean;
  staffForm: FormGroup;
  newStaff: boolean;
  centers = [];
  costCenters = [];
  allReportingManagers = [];

  martialStatusOptions = ['Married', 'Unmarried', 'Widowed', 'Divorced'];
  ngOnInit() {
    this.staffForm = this.getStaffForm();
    this.getCenters();
    this.getCostCenters();
    this.getReportingManagers();
  }

  @Input()
  set id(id: number) {
    console.log(id);
    if (id) {
      // if id exist then show staff details
      this.newStaff = false;
      this.getStaff(id);
    } else {
      // no staff id so add new staff
      this.staff = {};
      this.newStaff = true;
      this.staffForm = this.getStaffForm();
    }
  }

  @Input()
  set update(update: boolean) {
    this.editable = update;
    const action = update ? 'enable' : 'disable';
  }

  // get staff data
  getStaff(id) {
    this.adminService.getStaffById(id).subscribe((staff: any) => {
      this.staff = staff;
      this.staffForm.patchValue(staff);
      this.staffForm.controls['costCenterId'].patchValue(
        staff.costCenter ? staff.costCenter.id + '' : ''
      );
      console.log(this.staffForm.value);
    });
  }

  getCenters() {
    this.adminService.getCenters().subscribe(res => {
      this.centers = res;
    });
  }

  getCostCenters() {
    this.adminService.getCostCenter().subscribe(res => {
      this.costCenters = res;
    });
  }

  getReportingManagers() {
    this.adminService.getStaff().subscribe(res => {
      res.forEach(staff => {
          this.allReportingManagers.push({id: staff.id, name: staff.name});
      });
    });
  }
  setReportingManagerId() {
    if (this.staffForm.value['reportingManagerName'] !== 'select') {

      this.allReportingManagers.filter( staff => {
        if (this.staffForm.value['reportingManagerName'] === staff.name) {
          this.staffForm.controls['reportingManagerId'].patchValue(staff.id);
        }
      });
    } else {
      this.staffForm.controls['reportingManagerId'].patchValue('');
    }
  }

  hideViewPanel() {
    this.adminService.viewPanel.next(false);
  }
  uploadProfilePic(staff: any, file: any) {
    const formData = new FormData();
    formData.append('file', file);
    this.adminService
      .updateStaffProfilePic(staff.id, formData)
      .subscribe((response: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e: any) {
          $('#staff-profile').attr('src', e.target.result);
        };
      });
  }

  getStaffForm() {
    return this.fb.group({
      id: [''],
      eid: [''],
      costCenter: this.fb.group({
        id: ['select'],
        name: [''],
        code: [''],
        type: [''],
        active: ['']
      }),
      employerId: [''],
      employerName: ['select'],
      reportingManagerId: [''],
      reportingManagerName: ['select'],
      name: [''],
      firstName: [''],
      lastName: [''],
      mobile: [''],
      secondaryNumbers: [''],
      email: [''],
      payrollEnabled: [''],
      attendanceEnabled: [''],
      designation: [''],
      type: ['select'],
      active: [''],
      expectedIn: [''],
      expectedOut: [''],
      maritalStatus: ['select'],
      profile: this.getProfile(),
      biometricId: [''],
      approvalStatus: [''],
      expectedHours: [''],
      aadharNumber: [''],
      costCenterId: [''],
      mode: [''],
      searchReportingManager: ['']
    });
  }

  getProfile() {
    return this.fb.group({
      imagePath: [''],
      gender: [''],
      doj: [''],
      dob: [''],
      dol: [''],
      address: this.fb.group({
        address: [''],
        city: [''],
        state: [''],
        zipcode: [''],
        phone: [''],
        addressType: ['']
      }),
      permanentAddress: this.fb.group({
        address: [''],
        city: [''],
        state: [''],
        zipcode: [''],
        phone: [''],
        addressType: ['']
      }),
      pan: [''],
      uan: [''],
      pfan: [''],
      esin: [''],
      pran: [''],
      ban: [''],
      ifscCode: [''],
      bankName: [''],
      branchName: [''],
      holderName: ['']
    });
  }

  saveStaff() {
    if (this.newStaff) {
      // for new staff add request
      console.log(this.staffForm.value);
      delete this.staffForm.value['costCenter'];
      delete this.staffForm.value['aadharNumber'];
      delete this.staffForm.value['active'];
      delete this.staffForm.value['approvalStatus'];
      delete this.staffForm.value['attendanceEnabled'];
      delete this.staffForm.value['biometricId'];
      delete this.staffForm.value['eid'];
      delete this.staffForm.value['employerName'];
      delete this.staffForm.value['expectedHours'];
      delete this.staffForm.value['expectedIn'];
      delete this.staffForm.value['expectedOut'];
      delete this.staffForm.value['reportingManagerName'];
      delete this.staffForm.value['payrollEnabled'];
      delete this.staffForm.value['name'];
      delete this.staffForm.value['mode'];
      delete this.staffForm.value['id'];

      this.adminService.addStaff(this.staffForm.value).subscribe(res => {
        if (res.error) {
          this.alertService.errorAlert(res.error);
        } else {
          this.alertService.successAlert('New Staff Added');
        }
      });
    } else {
      // for update staff record
      this.adminService.updateStaff(this.staffForm.value).subscribe(res => {
        if (res.error) {
          this.alertService.errorAlert(res.error);
        } else {
          this.alertService.successAlert('Staff Details Updated');
        }
        this.id = null;
        this.staff = {};
        this.adminService.viewPanel.next(false);
      });
    }
  }
}
