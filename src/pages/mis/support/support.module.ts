import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentQueriesComponent } from './parent-queries/parent-queries.component';
import { SupportRoutingModule } from './/support-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SupportRoutingModule
  ],
  declarations: [ParentQueriesComponent]
})
export class SupportModule { }
