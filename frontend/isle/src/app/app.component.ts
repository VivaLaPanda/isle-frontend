import {Component, HostBinding, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Router} from '@angular/router';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkMode;
  @ViewChild('sidenav') sidenav: MatSidenav;
  navMode = 'side';
  @HostBinding('class') componentCssClass;

  constructor(private router: Router, public overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.navMode = 'over';
    }

    let themePref = localStorage.getItem('theme_pref');
    if (!(themePref)) {
      themePref = 'dark-theme';
    }

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
