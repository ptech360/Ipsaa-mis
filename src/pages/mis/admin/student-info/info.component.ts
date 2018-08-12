import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import {
  FormGroup,
  FormBuilder,
  FormControl
} from '../../../../../node_modules/@angular/forms';
import * as _ from 'underscore';
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
    console.log(id);
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
  constructor(private adminService: AdminService, private fb: FormBuilder) {}

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
      active: [''],
      admissionDate: [''],
      admissionNumber: [''],
      approvalStatus: [''],
      bloodGroup: [''],
      centerId: [''],
      corporate: [true],
      dob: [''],
      expectedIn: [''],
      expectedOut: [''],
      familyType: [''],
      firstName: [''],
      lastName: [''],
      nickName: [''],
      fullName: [''],
      gender: [''],
      groupId: [''],
      id: [''],
      imagePath: [''],
      mode: [''],
      nationality: [''],
      profile: [''],
      programId: [''],
      parents: this.fb.array([this.getParentData(), this.getParentData()])
    });
  }

  getParentData() {
    return this.fb.group({
      account: [''],
      designation: [''],
      educationalQualification: [''],
      email: [''],
      emailEnabled: [''],
      emergencyContact: [''],
      firstName: [''],
      fullName: [''],
      id: [''],
      lastName: [''],
      mobile: [''],
      occupation: [''],
      organisation: [''],
      relationship: [''],
      secondaryNumbers: [''],
      smsEnabled: [''],
      residentialAddress: this.getAddressField(),
      officeAddress: this.getAddressField()
    });
  }

  getAddressField() {
    return this.fb.group({
      address: [''],
      addressType: [''],
      city: [''],
      phone: [''],
      state: [''],
      zipcode: ['']
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
        });
    }
  }

  saveStudent() {
    if (this.editable) {
      this.adminService
        .updateStudent(this.studentForm.value)
        .subscribe((response: any) => {
          _.extend(this.student, response);
          swal({
            title: 'Student Info Successfully updated.',
            icon: 'success'
          });
        });
    }
  }
}
