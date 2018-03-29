import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {AuthService} from '../auth/auth.service';
import {UserGuard} from '../auth/user.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full'},
  // { path: 'home', component: TimeclockComponent, canActivate: [UserGuard]},
  // { path: 'admin', component: StaffReportsComponent, canActivate: [AdminGuard]},
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    // AdminGuard,
    UserGuard,
    AuthService,
  ]
})
export class AppRoutingModule { }
