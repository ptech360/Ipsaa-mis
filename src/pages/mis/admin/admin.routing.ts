import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StudentComponent } from './student/student.component';
import { AppStaffComponent } from './staff/staff.component';

export const adminRoutes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            {
                path: 'student', component: StudentComponent
            },
            {
                path: 'staff', component: AppStaffComponent
            }
        ]
    }
];

@NgModule({
 imports: [RouterModule.forChild(adminRoutes)],
 exports: [RouterModule]
})
export class AdminRoutingModule {
 constructor() {
 }
}

