import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DashboardService } from '../../../../providers/dashboard/dashboard.service';
import { AdminService } from '../../../../providers/admin/admin.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {
  tabs = ['Center', 'Zone', 'City'];
  zones: any[] = [];
  cities: any[] = [];
  centers: any[] = [];
  tableData: any[] = [];
  tableColumn: string[] = [];
  tableTitle = 'Centers';
  viewPanel: boolean;
  centerForm: any;
  zoneForm: any;
  cityForm: any;
  editable: boolean;
  selectedTab = 'Center';

  constructor(
    private dashboardService: DashboardService,
    private adminService: AdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscribeViewPanelChange(false);
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
      this.tableColumn = [
        'code',
        'capacity',
        'name',
        'type',
        'address',
        'city',
        'zone'
      ];
    });
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
    this.viewPanel = false;
    this.tableData = [];
    this.tableColumn = [];
    switch (tab) {
      case 'Center':
        this.tableTitle = 'Centers';
        this.tableData = this.centers;
        this.tableColumn = [
          'code',
          'capacity',
          'name',
          'type',
          'address',
          'city',
          'zone'
        ];
        break;
      case 'Zone':
        this.tableTitle = 'Zones';
        this.tableData = this.zones;
        this.tableColumn = ['name', 'cities'];
        break;
      case 'City':
        this.tableTitle = 'Cities';
        this.tableData = this.cities;
        this.tableColumn = ['name', 'zone'];
        break;
    }
  }

  showSidePanel(update: boolean, data: any) {
    this.viewPanel = true;
    this.subscribeViewPanelChange(true);
    this.editable = update;
    if (update) {
      switch (this.tableTitle) {
        case 'Centers':
          this.centerForm = this.getCenterForm().patchValue(data);
          break;
        case 'Zones':
          this.zoneForm = this.getZoneForm().patchValue(data);
          break;
        case 'Cities':
          this.cityForm = this.getCityForm().patchValue(data);
          break;
      }
    } else {
      switch (this.tableTitle) {
        case 'Centers':
          this.centerForm = this.getCenterForm();
          break;
        case 'Zones':
          this.zoneForm = this.getZoneForm();
          break;
        case 'Cities':
          this.cityForm = this.getCityForm();
          break;
      }
    }
  }

  hideViewPanel() {
    this.viewPanel = false;
  }

  getCenterForm() {
    return this.fb.group({
      active: [],
      address: [],
      addressType: [],
      capacity: [],
      city: [],
      code: [],
      id: [],
      mode: [],
      name: [],
      phone: [],
      state: [],
      type: [],
      zipcode: [],
      zone: []
    });
  }

  getZoneForm() {
    return this.fb.group({
      id: [],
      mode: [],
      name: []
    });
  }

  getCityForm() {
    return this.fb.group({
      id: [],
      mode: [],
      name: [],
      zone: []
    });
  }

  subscribeViewPanelChange = val => {
    this.viewPanel = val;
    if (val && this.tableTitle === 'Centers') {
      for (let i = this.tableColumn.length - 1; i--; ) {
        if (this.tableColumn[i] === 'address') {
          this.tableColumn.splice(i, 1);
        }
      }
    }
  }
}
