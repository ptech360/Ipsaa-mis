import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../providers/dashboard/dashboard.service';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: []
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
 monthlyFee: any = {};
 quarterlyFee: any = {};
 constructor(private dashboardService: DashboardService) {

 }

 ngOnInit() {
  this.getMonthlyFee();
  this.getQuarterlyFee();
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
   this.getCenterByZone(this.selectedZone.name);
  } else {
   this.cities = this.citiesCopy;
  }
  if (this.selectedCity) { object.zone = this.selectedZone.name; }
  if (this.selectedCenter) { object.zone = this.selectedZone.name; }
  this.dashboardService.getStats(object).subscribe((response: any) => {
   this.statsResult = response;
  });
 }

 getCenterByZone(zone: string) {
  this.dashboardService.getCenterByZone(zone).subscribe((response: any) => {
   this.centers = response;
  });
 }

 getMonthlyFee() {
  console.log(this.monthly);
  this.dashboardService.getFee(this.monthly).subscribe((response: any) => {
   this.monthlyFee = response;
  });
 }

 getQuarterlyFee() {
  console.log(this.quarterly);
  this.dashboardService.getFee(this.quarterly).subscribe((response: any) => {
   this.quarterlyFee = response;
  });
 }

}
