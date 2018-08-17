import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../../../../providers/payroll/payroll.service';
import { AdminService } from '../../../../providers/admin/admin.service';
import { PagerService } from '../../../../providers/pagination/pager.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  salaryList: any[] = [];
  editable: boolean;
  viewPanel: boolean;
  selectedSalary: any;
  salaryListCopy: any[];
  allItems: any;
  pagedItems: any;
  pager: any = {};

  constructor(
    private payrollService: PayrollService,
    private adminService: AdminService,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.adminService.viewPanel.subscribe((val: boolean) => {
      this.viewPanel = val;
    });
    this.getSalary();
  }

  getSalary() {
    this.payrollService.getSalary().subscribe((response: any[]) => {
      this.salaryList = response;
      this.allItems = response;
      this.setPage(1);
    });
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
  }

  showSidePanel(update: boolean, salary: any) {
    this.editable = update;
    this.selectedSalary = salary;
    // this.viewPanel = true;
    this.adminService.viewPanel.next(true);
  }
}
