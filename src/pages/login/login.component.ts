import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  private user: any = {};

  constructor(private userService: User) {}

  ngOnInit() {}

  verifyUser() {
    this.userService.login(this.user).subscribe((response: any) => {
      console.log(response);
    });
  }
}
