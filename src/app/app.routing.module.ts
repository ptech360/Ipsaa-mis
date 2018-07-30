import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from '../providers/gaurd/auth.gaurd';
import { LoginGaurd } from '../providers/gaurd/login.gaurd';

const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: 'login', loadChildren: 'pages/login/login.module#LoginModule',  canActivate: [LoginGaurd]},
 { path: 'mis', loadChildren: 'pages/mis/mis.module#MISModule', canActivate: [AuthGaurd] }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: [AuthGaurd, LoginGaurd]
})
export class AppRoutingModule {
 constructor() {

 }
}