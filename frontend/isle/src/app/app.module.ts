import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './router/app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ContentNodeComponent } from './content-node/content-node.component';
import { PostComponent } from './post/post.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UIComponentModule} from './uicomponent-module/uicomponent-module.module';
import {MarkdownToHtmlModule} from 'markdown-to-html-pipe';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import * as Raven from 'raven-js';
import {ErrorHandler} from 'protractor/built/exitCodes';
import {SignupComponent} from './auth/signup/signup.component';
import {EmailComponent} from './auth/email/email.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import {SidenavComponent} from './sidenav/sidenav.component';

if (environment.production) {
  Raven
    .config('https://60acaf5d8ce44b5e8e9d8ecd460a0895@sentry.io/1187729')
    .install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ContentNodeComponent,
    PostComponent,
    CategoryComponent,
    TimeAgoPipe,
    LoginComponent,
    SignupComponent,
    EmailComponent,
    UserProfileComponent,
    SidenavComponent,
    TimeAgoPipe,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    // AngularFireStorageModule, // imports firebase/storage only needed for storage features
    BrowserModule,
    AppRoutingModule,
    UIComponentModule,
    MarkdownToHtmlModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ])
  ],
  providers: [environment.production ? {
    provide: ErrorHandler,
    useClass: RavenErrorHandler,
  } : []],
  bootstrap: [AppComponent]
})
export class AppModule { }
