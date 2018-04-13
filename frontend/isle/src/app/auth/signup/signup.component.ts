import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  error: any;

  constructor(public afAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar) {

  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.createUserWithEmailAndPassword(formData.data.email, formData.data.password)
        .then((success) => {
          this.router.navigate(['/']);
        }, (err) => {
          console.log(err);
          this.snackBar.open('Failed to login: ' + err, null,{duration: 3000});
        });
    }
  }

  ngOnInit() {
  }

}
