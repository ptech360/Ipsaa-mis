import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../providers/dashboard/dashboard.service';
import {Student} from '../../../modal/student';
@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 zones: any;
 cities: any;
 centers: any;
 citiesCopy: any;
 centersCopy: any;
 statsResult: any = {};
 selectedZone: any = 'all';
 selectedCity: any = 'all';
 selectedCenter: any = 'all';
 months: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 quarters: any[] = ['FYQ4', 'FYQ1', 'FYQ2', 'FYQ3'];
 monthly: any = { feeDuration: 'Monthly', month: new Date().getMonth() + 1, year: new Date().getFullYear() };
 quarterly: any = { feeDuration: 'Quarterly', quarter: Math.floor(new Date().getMonth() / 3) + 1 , year: new Date().getFullYear() };
 years: any[] = [new Date().getFullYear() - 1, new Date().getFullYear()];
 monthlyFee: any = {};
 quarterlyFee: any = {};
 students: Student[] = [];
 tableData: any[] = [];
 staff: any;
 tableColumn: any[] = [];
 tableTitle: string;
 constructor(private dashboardService: DashboardService) {

 }

 ngOnInit() {
  this.getMonthlyFee({});
  this.getQuarterlyFee({});
  this.getStatsResult();
  this.getZones();
  this.getCities();
  this.getCenters();
 }

 getZones() {
  this.dashboardService.getZones().subscribe((response: any) => {
   this.zones = response;
  });
 }

 getCities() {
  this.dashboardService.getCities().subscribe((response: any) => {
   this.cities = response;
   this.citiesCopy = JSON.parse(JSON.stringify(response));
  });
 }

 getCenters() {
  this.dashboardService.getCenters().subscribe((response: any) => {
   this.centers = response;
   this.centersCopy = JSON.parse(JSON.stringify(response));
  });
 }

 getStatsResult() {
  const object: any = {};
  if (this.selectedZone !== 'all') {
   object.zone = this.selectedZone.name;
   this.cities = this.selectedZone.cities;
   // this.getCenterByZone(this.selectedZone.name);
  }
  if (this.selectedCity !== 'all') { object.city = this.selectedCity.name; }
  if (this.selectedCenter !== 'all') { object.center = this.selectedCenter.code; }
  this.getMonthlyFee(object);
  this.getQuarterlyFee(object);
  this.dashboardService.getStats(object).subscribe((response: any) => {
   this.statsResult = response;
  });
 }

 getCenterByZone(zone: string) {
  this.dashboardService.getCenterByZone(zone).subscribe((response: any) => {
   this.centers = response;
  });
 }

 getMonthlyFee(object: any) {
  if (object) {
   object = Object.assign(object, this.monthly );
  } else {
   object = Object.assign({}, this.monthly );
  }
  this.dashboardService.getFee(object).subscribe((response: any) => {
   this.monthlyFee = response;
  });
 }

 getQuarterlyFee(object: any) {
  if (object) {
   object = Object.assign(object, this.quarterly );
  } else {
   object = Object.assign({}, this.quarterly );
  }
  this.dashboardService.getFee(object).subscribe((response: any) => {
   this.quarterlyFee = response;
  });
 }

 getStudents() {
  this.tableTitle = 'Students';
  this.tableData = [];
  this.dashboardService.getStudents().subscribe((response: any) => {
   this.tableData = response;
   this.students = response;
   this.tableColumn = [ 'name', 'program', 'group', 'present', 'expectedIn', 'expectedOut', 'checkin', 'checkout', 'extraHours'];
  });
 }

 getStaff() {
  this.tableTitle = 'Staff';
  this.tableData = [];
  this.dashboardService.getStaff().subscribe((response: any) => {
   this.tableData = response;
   this.tableColumn = [ 'eid', 'name', 'designation', 'mobile', 'center', 'employer', 'ctc'];
  });
 }

 getCenterList() {
  this.tableTitle = 'Centers';
  this.tableData = [];
  this.dashboardService.getCenterList().subscribe((response: any) => {
   this.tableData = response;
   this.tableColumn = ['code', 'capacity', 'name', 'type', 'address', 'city', 'zone'];
  });
 }

 getFilteredStudents(filterType: any) {
  this.tableTitle = filterType + ' Students';
  this.tableData = [];
  this.tableColumn = [];
  this.dashboardService.getStudents().subscribe((response: any) => {
   this.students = response;
   switch (filterType) {
    case 'Present':
     this.tableColumn = [ 'name', 'program', 'group', 'corporate', 'checkin', 'expectedOut'];
     this.tableData = this.students.filter(student => {
      return student.present;
     });
    break;
    case 'Corporate':
     this.tableColumn = [ 'name', 'program', 'group', 'corporate', 'checkin', 'checkout', 'expectedOut', 'extraHours'];
     this.tableData = this.students.filter((student: any) => {
      if (student.checkin < student.expectedIn) {
       student.extraHours += Math.trunc(student.expectedIn - student.checkin);
      }
      if (student.checkout > student.expectedOut) {
       student.extraHours += Math.trunc(student.checkout - student.expectedOut);
      }
      return student.corporate;
     });
    break;
    case 'Non-corporate':
     this.tableColumn = [ 'name', 'program', 'group', 'corporate', 'checkin' , 'checkout', 'expectedOut', 'extraHours'];
     this.tableData = this.students.filter((student: any) => {
      if (student.checkin < student.expectedIn) {
       student.extraHours += Math.trunc(student.expectedIn - student.checkin);
      }
      if (student.checkout > student.expectedOut) {
       student.extraHours += Math.trunc(student.checkout - student.expectedOut);
      }
      return !(student.corporate);
     });
    break;
   }
  });
 }

 getStudentFee(feeDuration: any) {
  const object: any = {};
  this.tableTitle = 'Students Fee';
  this.tableData = [];
  this.tableColumn = [];
  object.feeDuration = feeDuration;
  if (this.selectedZone !== 'all') { object.center = this.selectedZone.name; }
  if (this.selectedCity !== 'all') { object.city = this.selectedCity.name; }
  if (this.selectedCenter !== 'all') { object.center = this.selectedCenter.code; }
  this.dashboardService.getStudentFee(object).subscribe((response: any) => {
   this.tableData = response;
   this.tableColumn = [ 'name', 'program', 'group', 'center', 'baseFee', 'discount', 'finalFee', 'feeDuration'];
  });
 }

}
