import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MISRoutes } from './mis.routing';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { ComponentsModule } from '../components/components.module';
import { MISComponent } from './mis.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from '../components/table/table.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MISRoutes),
    FormsModule,
    ComponentsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [MISComponent, DashboardComponent, TableComponent],
})

export class MISModule {}
