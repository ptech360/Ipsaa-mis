import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '../localstorage/storage';

@Injectable()
export class MenuService{
 menu: any;
 constructor(public api: Api,public storage : Storage) { 

 }

 getMenus(){
  return this.api.get("/api/user/menu");
 }

 getUserProfile(){
  return this.api.get("/api/user/me/");
 }
}