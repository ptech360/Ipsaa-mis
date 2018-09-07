import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFeeComponent} from './student-fee/student-fee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeeRoutingModule } from './fee.routing.module';
import { StudentFeeInfoComponent } from './student-fee-details/student-fee-info.component';
// import { MatSelectModule, MatInputModule, MatSpinner } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeeRoutingModule,
    // MatSelectModule,
    // MatInputModule
  ],
  declarations: [StudentFeeComponent, StudentFeeInfoComponent]
})
export class FeeModule {}
