import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {
  role: string;
  loggedIn: boolean;
  user: User;
  constructor(
    public authService: AuthService,
    public router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.testGetSelf().subscribe((user: User) => {
      this.user = user;
    });

    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.role = 'USER';
      } else {
        this.loggedIn = false;
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
