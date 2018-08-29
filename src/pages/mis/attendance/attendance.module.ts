import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceRoutingModule } from './attendance-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AttendanceRoutingModule
  ],
  declarations: [StudentAttendanceComponent, StaffAttendanceComponent]
})
export class AttendanceModule { }
