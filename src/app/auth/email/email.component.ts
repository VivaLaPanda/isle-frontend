import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../auth.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<EmailComponent>,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.afAuth.auth.currentUser != null) {
      this.router.navigateByUrl(this.authService.redirectUrl || '/');
    }
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then((success) => {
        console.log(success);
        this.router.navigate(['/members']);
      }, (err) => {
        console.log(err);
        this.snackBar.open('Failed to login: ' + err, null,{duration: 3000});
      });
    }
  }
}
