import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../auth.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfigService} from '../../services/config.service';
import {EmailComponent} from '../email/email.component';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  appName: string;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.afAuth.authState.map((user: firebase.User) => {
      if (user != null) {
        this.router.navigateByUrl(this.authService.redirectUrl || '/');
      }
    });
    this.appName = this.configService.getConfig().interface.appName;
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(auth => {
      if(auth) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      }
    }, (err) => {
      console.error(err);
      this.snackBar.open('Failed to login: ' + err, null,{duration: 3000});
    });
  }

  loginEmail() {
    const dialogRef = this.dialog.open(EmailComponent);
  }
}
