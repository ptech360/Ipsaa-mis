import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from '../providers/gaurd/auth.gaurd';
import { LoginGaurd } from '../providers/gaurd/login.gaurd';
import { PageNotFound } from '../pages/404/page404';
import { LoginComponent } from '../pages/login/login.component';

const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: 'login',
   // loadChildren: 'pages/login/login.module#LoginModule',
   component: LoginComponent, canActivate: [LoginGaurd]},
 { path: 'mis', loadChildren: 'pages/mis/mis.module#MISModule', canActivate: [AuthGaurd] },
 {
  path: '**',
  redirectTo: '/page404'
 },
 {
  path: 'page404',
  component: PageNotFound
 }
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
