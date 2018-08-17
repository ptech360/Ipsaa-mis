import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import * as _ from 'underscore';
import { AlertService } from '../../../../providers/alert/alert.service';
declare let $: any;

@Component({
  selector: 'app-student-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class StudentInfoComponent implements OnInit {
  student: any = {};
  editable: boolean;
  studentForm: FormGroup;
  programs: any[];
  centers: any[];
  groups: any[];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'NA'];
  newStudent: boolean;
  @Input()
  set id(id: number) {
    if (id) {
      this.newStudent = false;
      this.adminService.getStudentById(id).subscribe((student: any) => {
        this.student = student;
        this.studentForm.patchValue(student);
        this.studentForm.controls['centerId'].patchValue(student.center.id);
        this.studentForm.controls['groupId'].patchValue(student.group.id);
        this.studentForm.controls['programId'].patchValue(student.program.id);
      });
    } else {
      this.newStudent = true;
      this.studentForm = this.getStudentForm();
    }
  }

  @Input()
  set update(update: boolean) {
    this.editable = update;
  }
  constructor(private adminService: AdminService, private fb: FormBuilder, private alerService: AlertService) {}

  ngOnInit() {
    this.getCenters();
    this.getPrograms();
    this.getGroups();
    this.studentForm = this.getStudentForm();
    if (this.newStudent) {
      this.studentForm.addControl('fee', this.getFeeField());
    }
    console.log(this.studentForm.value);
  }

  getStudentForm() {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nickName: [''],
      centerId: ['', [Validators.required]],
      programId: ['', [Validators.required]],
      groupId: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      bloodGroup: [''],
      familyType: [''],
      nationality: ['', [Validators.required]],
      expectedIn: ['', [Validators.required]],
      expectedOut: ['', [Validators.required]],
      corporate: [false],
      active: [''],
      admissionDate: [''],
      admissionNumber: [''],
      approvalStatus: [''],
      dob: [''],
      fullName: [''],
      id: [''],
      imagePath: [''],
      mode: [''],
      profile: [''],
      parents: this.fb.array([this.getParentData(), this.getParentData()])
    });
  }

  getParentData() {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
      smsEnabled: [''],
      emailEnabled: [''],
      educationalQualification: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      residentialAddress: this.getAddressField(),
      officeAddress: this.getAddressField(),
      account: [''],
      emergencyContact: [''],
      fullName: [''],
      id: [''],
      organisation: [''],
      relationship: [''],
      secondaryNumbers: [''],
    });
  }

  getAddressField() {
    return this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      addressType: [''],
      phone: [''],
    });
  }

  getFeeField() {
    return this.fb.group({
      adjust: [],
      baseFee: [],
      cgst: [],
      comment: [],
      discount: [],
      feeDuration: [],
      finalFee: [],
      gstFee: [],
      igst: [],
      sgst: [],
      transportFee: []
    });
  }

  hideViewPanel() {
    this.adminService.viewPanel.next(false);
  }

  getCenters() {
    this.adminService.getCenters().subscribe((response: any[]) => {
      this.centers = response;
    });
  }

  getGroups() {
    this.adminService.getGroups().subscribe((response: any[]) => {
      this.groups = response;
    });
  }

  getPrograms() {
    this.adminService.getPrograms().subscribe((response: any[]) => {
      this.programs = response;
    });
  }

  uploadProfilePic(student: any, file: any) {
    const formData = new FormData();
    formData.append('file', file);
    if (file) {
      this.adminService
        .uploadStudentProfilePic(student.id, formData)
        .subscribe((response: any) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e: any) {
            $('#student-profile').attr('src', e.target.result);
          };
        }, (error: any) => {
          this.alerService.errorAlert(error);
        });
    }
  }

  saveStudent() {
    if (this.editable) {
      this.adminService
        .updateStudent(this.studentForm.value)
        .subscribe((response: any) => {
          _.extend(this.student, response);
          this.alerService.successAlert('Student Info Successfully updated.');
          this.adminService.viewPanel.next(false);
        });
    }
  }
}
