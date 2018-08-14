import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StudentComponent } from './student/student.component';
import { AppStaffComponent } from './staff/staff.component';
import { CenterComponent } from './center/center.component';
import { ProgramComponent } from './program/program.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'center',
        component: CenterComponent
      },
      {
        path: 'program',
        component: ProgramComponent
      },
      {
        path: 'student',
        component: StudentComponent
      },
      {
        path: 'staff',
        component: AppStaffComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  constructor() {}
}
