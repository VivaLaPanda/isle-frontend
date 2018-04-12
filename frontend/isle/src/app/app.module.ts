import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ContentNodeComponent } from './content-node/content-node.component';
import { PostComponent } from './post/post.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UIComponentModule} from './uicomponent-module/uicomponent-module.module';
import {TimeAgoPipe} from 'time-ago-pipe';
import {MarkdownToHtmlModule} from 'markdown-to-html-pipe';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

@NgModule({
  declarations: [
    AppComponent,
    ContentNodeComponent,
    PostComponent,
    CategoryComponent,
    TimeAgoPipe,
    LoginComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UIComponentModule,
    MarkdownToHtmlModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
