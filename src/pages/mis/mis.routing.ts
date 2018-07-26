import { Routes } from '@angular/router';
import { MISComponent } from './mis.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const MISRoutes: Routes = [
    {path:'', component:MISComponent,
     children:[
         {
             path:'', redirectTo:'dashboard', pathMatch:'full'
         },
         {
             path:'dashboard',
             component:DashboardComponent
         }
     ]   
    }
];
