import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Api } from '../providers/api/api';
import { User } from '../providers/user/user';
import { StorageService } from '../providers/localstorage/storage';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Page404Component } from '../pages/404/page404.component';
import { LoginComponent } from '../pages/login/login.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component
  ],
  providers: [Api, User, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
