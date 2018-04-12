import {Component, HostBinding, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';
import {OverlayContainer} from '@angular/cdk/overlay';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {ConfigService} from './services/config.service';
import * as Raven from 'raven-js';
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService, ConfigService]
})
export class AppComponent implements OnInit {
  isDarkMode;
  @ViewChild('sidenav') sidenav: MatSidenav;
  navMode = 'side';
  @HostBinding('class') componentCssClass;
  userID: string;
  appName: string;

  constructor(
    private router: Router,
    public overlayContainer: OverlayContainer,
    private configService: ConfigService,
    private userService: UserService) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
  }

  ngOnInit() {
    this.appName = this.configService.getConfig().interface.appName;

    if (window.innerWidth < 768) {
      this.navMode = 'over';
    }

    let themePref = localStorage.getItem('theme_pref');
    if (!(themePref)) {
      themePref = 'dark-theme';
    }

    this.userService.testGetSelf().subscribe((user: User) => {
      this.userID = user.uid;
      ga('set', {'user_id': this.userID}); // Set the user ID using signed-in user_id.
    });

    this.onSetTheme(themePref);
  }

  onSetTheme(theme) {
    localStorage.setItem('theme_pref', theme);
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    this.isDarkMode = !this.isDarkMode;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.navMode = 'over';
      this.sidenav.close();
    }
    if (event.target.innerWidth > 768) {
      this.navMode = 'side';
      this.sidenav.open();
    }
  }
}
