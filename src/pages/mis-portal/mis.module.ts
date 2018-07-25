import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MISComponent } from './mis.component';
import { RouterModule } from '@angular/router';

@NgModule({
 imports:[CommonModule,
          FormsModule,
          ReactiveFormsModule,
          RouterModule.forChild([{
           path:'',
           component:MISComponent
         }])
         ],
 declarations:[MISComponent]
})
export class MISModule{

}