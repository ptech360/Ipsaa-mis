import {Component} from '@angular/core';
import { MenuService } from '../../providers/initial/menu.service';
import * as $ from "jquery";
declare let $:any;

@Component({
 selector:'mis',
 templateUrl:'./mis.component.html',
 styleUrls:[]
})
export class MISComponent{
 menu: any = {};
 self: any = {};
 profileImageURI: string;
 
 constructor(private menuService: MenuService) {
  menuService.getMenus().subscribe((response: any) => {
   this.menu = response;
  }, err => {
   console.error('ERROR', err);
  });

  menuService.getUserProfile().subscribe((response: any) => {
   this.self = response;
   if (this.self.profileImage) {
    this.profileImageURI = "http://ipsaaprod.s3-website.ap-south-1.amazonaws.com/" + this.self.profileImage;
} else {
    this.profileImageURI = "/assets/img/faces/default_profile_pic.png";
}
  }, err => {
   console.error('ERROR', err);
  });
 }

 ppFileBrowse(){
  $('#profilePicUpload').trigger('click');
 }

 menuClicked(){
  $('.navbar-toggle').click();
  $('.sidebar .collapse').collapse('hide').on('hidden.bs.collapse', function () {
      $(this).css('height', 'auto');
  });
 }

 menuToggle(){
    $('.sidebar .sidebar-wrapper').perfectScrollbar('update');
 }

 logout(){

 }
}