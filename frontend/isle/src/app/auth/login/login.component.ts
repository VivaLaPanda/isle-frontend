import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  message: string;
  userModel: {
    username: string;
    password: string;
  };

  constructor(public authService: AuthService, public router: Router, public snackBar: MatSnackBar) {
    this.setMessage();
    this.userModel = {username: '', password: ''};
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      // Get the redirect URL from our auth service
      // If no redirect has been set, use the default
      let redirect;
      if (this.authService.role === 'CLIENT') {
        redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/client-report';
      } else {
        redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
      }

      // Redirect the user
      this.router.navigate([redirect]);
    }
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login(this.userModel.username, this.userModel.password).subscribe(() => {
        this.setMessage();
        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

          // Redirect the user
          this.router.navigate([redirect]);
        }
      },
      err => {
        console.log(err);
        this.snackBar.open('Login Failed: ' + err.error.error, null, {duration: 2000});
      });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
