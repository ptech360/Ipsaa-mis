import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { PagerService } from '../../../../providers/pagination/pager.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  activeStatus = true;
  pageNumber = 0;
  pageSize = 0;
  programCode = 'ALL';

  // array of all items to be paged
  allItems: any[] = [];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[] = [];
  viewPanel: boolean;
  selectedStudent: any = {};
  update: boolean;
  programs: any;
  studentsCopy: any;
  searchKey: any;
  loader: boolean;

  constructor(
    private adminService: AdminService,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.getStudents();
    this.getPrograms();
    this.subscribeViewPanelChange();
  }

  getStudents() {
    const object = {
      active: this.activeStatus,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      programCode: this.programCode
    };

    this.students = [];
    this.loader = true;
    this.adminService.getStudents(object).subscribe((response: any) => {
      this.loader = false;
      this.allItems = response.students;
      this.students = response.students;
      this.studentsCopy = JSON.parse(JSON.stringify(this.students));
      this.pageSize = response.pageSize;
      this.pageNumber = response.pageNumber;
      // initialize to page 1
      this.setPage(1);
      // checked if searchKey entered before
      if (this.searchKey) {
        this.searchStudent(this.searchKey);
      }
    });
  }

  getPrograms() {
    this.adminService.getPrograms().subscribe((response: any) => {
      this.programs = response;
    });
  }

  showStudent(student) {
    this.update = false;
    this.selectedStudent = student;
    this.adminService.viewPanel.next(true);
  }

  editStudent(student) {
    this.update = true;
    this.selectedStudent = student;
    this.adminService.viewPanel.next(true);
  }

  addNewStudent() {
    this.update = false;
    this.selectedStudent = {};
    this.adminService.viewPanel.next(true);
  }

  deleteStudentSwal(student: any) {
    swal({
      title: 'Are you sure want to deactivate student?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      buttons: ['Cancel', 'OK'],
      closeOnClickOutside: true,
      closeOnEsc: true,
      dangerMode: true
    }).then(value => {
      if (value) {
        this.adminService.deleteStudentById(student.id);
      }
    });
  }

  hasPrivilege(previlage) {
    return true;
  }

  setPage(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //  return;
    // }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

    console.log(this.pagedItems.length);
  }

  subscribeViewPanelChange = () => {
    this.adminService.viewPanel.subscribe((val: boolean) => {
      this.viewPanel = val;
    });
  }

  searchStudent(event: any) {
    this.searchKey = event;
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.allItems = this.students.filter(student => {
        return student.fullName.startsWith(val);
      });
      this.setPage(1);
    } else {
      this.allItems = this.studentsCopy;
      this.setPage(1);
    }
  }
}
