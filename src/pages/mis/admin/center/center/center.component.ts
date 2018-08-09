import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../../providers/dashboard/dashboard.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {

  tabs = ['Centers', 'Zones', 'Cities'];
  zones: any[] = [];
  cities: any[] = [];
  centers: any[] = [];
  tableData: any[] = [];
  tableColumn: string[] = [];
  tableTitle: string;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getCenters();
    this.getZones();
    this.getCities();
    this.changeTab('Centers');
  }

  getZones() {
    this.dashboardService.getZones().subscribe((response: any[]) => {
      this.zones = response;
    });
  }

  getCities() {
    this.dashboardService.getCities().subscribe((response: any[]) => {
      this.cities = response;
    });
  }

  getCenters() {
    this.dashboardService.getCenters().subscribe((response: any[]) => {
      this.centers = response;
      this.tableTitle = 'Centers';
      this.tableData = this.centers;
      this.tableColumn = ['code', 'capacity', 'name', 'type', 'address', 'city', 'zone'];
    });
  }

  changeTab(tab: string) {
    this.tableData = [];
    this.tableColumn = [];
    switch (tab) {
      case 'Centers':
        this.tableTitle = 'Centers';
        this.tableData = this.centers;
        this.tableColumn = ['code', 'capacity', 'name', 'type', 'address', 'city', 'zone'];
        break;
      case 'Zones':
        this.tableTitle = 'Zones';
        this.tableData = this.zones;
        this.tableColumn = ['name', 'cities'];
        break;
      case 'Cities':
        this.tableTitle = 'Cities';
        this.tableData = this.cities;
        this.tableColumn = ['name', 'zone'];
        break;
    }
  }

}
