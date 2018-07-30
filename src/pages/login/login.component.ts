import { Component, OnInit } from '@angular/core';
import { User } from '../../providers/user/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any = {};

  constructor(private userService: User, private router: Router) {}

  ngOnInit() {}

  verifyUser() {
    this.userService.login(this.user).subscribe(
      (response: any) => {
        this.onSuccess();
      },
      (error: any) => {
        this.onError();
      }
    );
  }

  onSuccess() {
    const user: any = this.userService.getUser();

    if (user.domain === '/pp/') {
      this.router.navigate(['pp']);
    } else {
      this.router.navigate(['mis']);
    }
  }

  onError() {}
}
