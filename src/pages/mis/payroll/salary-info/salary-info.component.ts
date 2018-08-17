import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { FormBuilder } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-salary-info',
  templateUrl: './salary-info.component.html',
  styleUrls: ['./salary-info.component.css']
})
export class SalaryInfoComponent implements OnInit {
  selectedSalary: any;
  editable: boolean;

  @Input() set salary(salary: any) {
    this.selectedSalary = salary;
  }

  @Input() set update(update: boolean) {
    this.editable = update;
  }

  constructor(private adminService: AdminService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  hideViewPanel() {
    // this.viewPanel = false;
    this.adminService.viewPanel.next(false);
  }

  getSalaryForm() {
    this.fb.group({
      advance: [],
      arrears: [],
      basic: [],
      bonus: [],
      conveyance: [],
      ctc: [],
      eid: [],
      entertainment: [],
      esi: [],
      esid: [],
      extraMonthlyAllowance: [],
      hra: [],
      medical: [],
      pfd: [],
      pfe: [],
      pfr: [],
      profd: [],
      professionalTax: [],
      retention: [],
      shoes: [],
      special: [],
      tds: [],
      tiffin: [],
      uniform: [],
      washing: []
    });
  }

}
