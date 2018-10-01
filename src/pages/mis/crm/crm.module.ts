import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from './/crm-routing.module';
import { ReportComponent } from './report/report.component';
import { InquiryComponent } from './inquiry/inquiry.component';

@NgModule({
  imports: [
    CommonModule,
    CrmRoutingModule
  ],
  declarations: [ReportComponent, InquiryComponent]
})
export class CrmModule { }
