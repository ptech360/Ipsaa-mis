import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PayrollComponent } from './payroll.component';
import { SalaryComponent } from './salary/salary.component';
import { GenerateMonthlySalaryComponent } from './generate-monthly-salary/generate-monthly-salary.component';

export const payrollRoutes: Routes = [{
  path: '',
  component: PayrollComponent,
  children: [
    {
      path: 'salary',
      component: SalaryComponent
    },
    {
      path: 'generate-monthly-salary',
      component: GenerateMonthlySalaryComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(payrollRoutes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
