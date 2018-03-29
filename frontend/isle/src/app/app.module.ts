import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ContentNodeComponent } from './content-node/content-node.component';
import { PostComponent } from './post/post.component';
import { CategoryComponent } from './category/category.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UIComponentModule} from './uicomponent-module/uicomponent-module.module';
import {TimeAgoPipe} from 'time-ago-pipe';
import {MarkdownToHtmlModule} from 'markdown-to-html-pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContentNodeComponent,
    PostComponent,
    CategoryComponent,
    TimeAgoPipe,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UIComponentModule,
    MarkdownToHtmlModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
