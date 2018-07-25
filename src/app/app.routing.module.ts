import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes:Routes = [
 {path:'',redirectTo:'login', pathMatch:'full'},
 { path : 'login', loadChildren: 'pages/login/login.module#LoginModule'},
 { path : 'mis', loadChildren: 'pages/mis-portal/mis.module#MISModule'}
]

@NgModule({
 imports:[RouterModule.forRoot(routes)],
 exports:[RouterModule]
})
export class AppRoutingModule{
 constructor(){

 }
}