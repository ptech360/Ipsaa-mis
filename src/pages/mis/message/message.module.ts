import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentMessageComponent } from './student-message/student-message.component';
import { StaffMessageComponent } from './staff-message/staff-message.component';
import { MessageRoutingModule } from './/message-routing.module';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageRoutingModule
  ],
  declarations: [StudentMessageComponent, StaffMessageComponent]
})
export class MessageModule { }
