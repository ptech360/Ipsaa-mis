import {Component, Input} from '@angular/core';
import { DashboardService } from '../../../../providers/dashboard/dashboard.service';
import { AdminService } from '../../../../providers/admin/admin.service';
import { FormBuilder, FormGroup } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-center-info',
  templateUrl: './info.component.html'
})
export class CenterInfoComponent {
  editable: boolean;
  zones: any[];
  cities: any[];
  selectedCenter: any;
  centerForm: FormGroup;

  @Input() set center(center: any) {
    this.selectedCenter = center;
    this.centerForm = this.getCenterForm();
    this.centerForm.patchValue(center);
  }

  @Input() set update(val: boolean) {
    this.editable = val;
  }
  constructor(private dashboardService: DashboardService, private adminService: AdminService, private fb: FormBuilder) {
    this.getZones();
    this.getCities();
    this.centerForm = this.getCenterForm();
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

  hideViewPanel() {
    this.adminService.viewPanel.next(false);
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

  getCitiesByZone(zone: any) {
    this.cities = this.zones.find(element => {
      return element.name === zone;
    }).cities;
  }
}
