import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { AlertService } from '../../../../providers/alert/alert.service';
import swal from 'sweetalert';

declare let $: any;

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html'
})
export class AppStaffComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private alertService: AlertService
  ) {}

  loading = true;
  loadingStaffList = false;
  centers: any;
  selectedCenter: any = 'all';
  staffType: object[] = [
    { name: 'CxO', value: 'CxO' },
    { name: 'Management', value: 'Management' },
    { name: 'Teacher', value: 'Teacher' },
    { name: 'Staff', value: 'Staff' }
  ];

  update: boolean;
  search: string;
  selectedStaffStatus: any = 'true';
  selectedStaffType: any = 'ALL';
  viewPanel = false;
  allItems = []; // all staff list will be stored here
  staffList = []; // filtered stafflist with pagination stored here
  filteredStaffList = []; // temp variable to store filtered staff
  searchKey: any; // search string for name
  pager: any = {}; // for pagination
  activeStatus = true;
  selectedStaff = {};
  paginator = {
    active: 1,
    items: 10,
    lenght: 1
  };

  ngOnInit() {
    // setting centers response from backend
    this.getCenter();
    // setting staffList response recived from backend
    this.getStaff();
    this.subscribeViewPanelChange();
  }

  getCenter() {
    this.adminService.getCenters().subscribe(response => {
      this.centers = response;
    });
  }

  getStaff() {
    this.adminService.getStaff().subscribe(response => {
      this.allItems = response;
      this.staffList = this.allItems;
      this.loading = false;
    });
  }

  searchStaff(event) {
    this.searchKey = event;
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.staffList = this.allItems.filter(staff => {
        return staff.name.toLowerCase().startsWith(val);
      });
      //   this.setPage(1);
    } else {
      this.staffList = this.allItems;
      // this.setPage(1);
    }
  }

  filterStaffByCenter(stafflist) {
    const list = stafflist ? stafflist : this.allItems;

    if (this.selectedCenter !== 'all') {
      this.staffList = list.filter(
        staff => staff.centerName === this.selectedCenter.name
      );
    } else {
      this.staffList = this.allItems;
    }
    this.staffLoaded();
  }

  filterStaff() {
    this.loadingStaffList = true;
    const filter = {
      employeeType: this.selectedStaffType,
      active: this.selectedStaffStatus,
      pageNumber: 0,
      pageSize: 0
    };
    this.adminService.filterStaff(filter).subscribe(response => {
      this.staffList = response.stafflist;
      this.filterStaffByCenter(this.staffList);
    });
  }

  showStaff(staff) {
    this.selectedStaff = staff;
    this.adminService.viewPanel.next(true);
  }

  staffLoaded() {
    setTimeout(() => {
      this.loadingStaffList = false;
    }, 500);
  }

  addStaff(staff) {
    //
  }

  editStaff(staff) {
    //
  }

  deleteStaffSwal(staffId) {
    swal({
      title: 'Are you sure want to deactivate Staff?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      buttons: ['Cancel', 'OK'],
      closeOnClickOutside: true,
      closeOnEsc: true,
      dangerMode: true
    }).then(value => {
      if (value) {
        this.adminService.deleteStaffById(staffId);
      }
    });
  }

  hasPrivilege(privilege) {}

  setPage(pageNumber) {
    // this.active = pageNumber;
  }

  subscribeViewPanelChange = () => {
    this.adminService.viewPanel.subscribe((val: boolean) => {
      this.viewPanel = val;
    });
  }
}
