import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffApprovalsComponent } from './staff-approvals/staff-approvals.component';
import { StudentApprovalsComponent } from './student-approvals/student-approvals.component';
import { ApprovalRoutingModule } from './approval-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ApprovalRoutingModule
  ],
  declarations: [StaffApprovalsComponent, StudentApprovalsComponent]
})
export class ApprovalModule { }
