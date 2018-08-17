import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollComponent } from './payroll.component';
import { PayrollRoutingModule } from './payroll-routing.module';
import { SalaryComponent } from './salary/salary.component';
import { SalaryInfoComponent } from './salary-info/salary-info.component';
import { PayrollService } from '../../../providers/payroll/payroll.service';

@NgModule({
  imports: [
    CommonModule,
    PayrollRoutingModule
  ],
  declarations: [PayrollComponent, SalaryComponent, SalaryInfoComponent],
  providers: [PayrollService]
})
export class PayrollModule { }
