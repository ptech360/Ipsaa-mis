import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './/report-routing.module';
import { InquiryReportComponent } from './inquiry-report/inquiry-report.component';
import { StudentFeeReportComponent } from './student-fee-report/student-fee-report.component';
import { StaffSalaryMonthlyReportComponent } from './staff-salary-monthly-report/staff-salary-monthly-report.component';
import { StudentAttendanceReportComponent } from './student-attendance-report/student-attendance-report.component';
import { StaffAttendanceReportComponent } from './staff-attendance-report/staff-attendance-report.component';
import { FeeCollectionReportComponent } from './fee-collection-report/fee-collection-report.component';

@NgModule({
  imports: [CommonModule, ReportRoutingModule],
  declarations: [
    InquiryReportComponent,
    StudentFeeReportComponent,
    StaffSalaryMonthlyReportComponent,
    StudentAttendanceReportComponent,
    StaffAttendanceReportComponent,
    FeeCollectionReportComponent
  ]
})
export class ReportModule {}