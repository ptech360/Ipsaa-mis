import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayrollComponent } from './payroll.component';
import { PayrollRoutingModule } from './payroll-routing.module';
import { SalaryComponent } from './salary/salary.component';
import { SalaryInfoComponent } from './salary-info/salary-info.component';
import { PayrollService } from '../../../providers/payroll/payroll.service';
import { GenerateMonthlySalaryComponent } from './generate-monthly-salary/generate-monthly-salary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PayrollRoutingModule
  ],
  declarations: [PayrollComponent, SalaryComponent, SalaryInfoComponent, GenerateMonthlySalaryComponent],
  providers: [PayrollService]
})
export class PayrollModule { }
