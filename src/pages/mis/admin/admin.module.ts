import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { StudentComponent } from './student/student.component';

@NgModule({
 imports: [
  CommonModule,
  AdminRoutingModule,
  FormsModule,
 ],
 declarations: [AdminComponent, StudentComponent]
})
export class AdminModule {

}

