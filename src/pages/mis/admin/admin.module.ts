import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { StudentComponent } from './student/student.component';
import { AdminService } from '../../../providers/admin/admin.service';
import { StudentInfoComponent } from './student-info/info.component';
import { AppStaffComponent } from './staff/staff.component';
import { StaffInfoComponent } from './staff-info/staffInfo.component';

@NgModule({
 imports: [
  CommonModule,
  AdminRoutingModule,
  FormsModule
 ],
 declarations: [AdminComponent, StudentComponent, StudentInfoComponent, AppStaffComponent, StaffInfoComponent],
 providers: [AdminService]
})
export class AdminModule {

}

