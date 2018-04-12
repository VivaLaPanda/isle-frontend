import {ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  changeDetectorRef;
  ngZone;
  timer;

  /**
   * @param {?} changeDetectorRef
   * @param {?} ngZone
   */
  constructor(changeDetectorRef: ChangeDetectorRef, ngZone: NgZone) {
    this.changeDetectorRef = changeDetectorRef;
    this.ngZone = ngZone;
  }

  /**
   * @param {?} value
   * @return {?}
   */
  transform(value) {
    this.removeTimer();
    const /** @type {?} */ d = new Date(value);
    const /** @type {?} */ now = new Date();
    const /** @type {?} */ seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    const /** @type {?} */ timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    const /** @type {?} */ minutes = Math.round(Math.abs(seconds / 60));
    const /** @type {?} */ hours = Math.round(Math.abs(minutes / 60));
    const /** @type {?} */ days = Math.round(Math.abs(hours / 24));
    const /** @type {?} */ months = Math.round(Math.abs(days / 30.416));
    const /** @type {?} */ years = Math.round(Math.abs(days / 365));
    if (Number.isNaN(seconds)) {
      return '';
    } else if (seconds <= 45) {
      return 'a few seconds ago';
    } else if (seconds <= 90) {
      return 'a minute ago';
    } else if (minutes <= 45) {
      return minutes + ' minutes ago';
    } else if (minutes <= 90) {
      return 'an hour ago';
    } else if (hours <= 22) {
      return hours + ' hours ago';
    } else if (hours <= 36) {
      return 'a day ago';
    } else if (days <= 25) {
      return days + ' days ago';
    } else if (days <= 45) {
      return 'a month ago';
    } else if (days <= 345) {
      return months + ' months ago';
    } else if (days <= 545) {
      return 'a year ago';
    } else {
      // (days > 545)
      return years + ' years ago';
    }
  }

  /**
   * @return {?}
   */
  ngOnDestroy() {
    this.removeTimer();
  }

  /**
   * @return {?}
   */
  removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * @param {?} seconds
   * @return {?}
   */
  getSecondsUntilUpdate(seconds) {
    const /** @type {?} */ min = 60;
    const /** @type {?} */ hr = min * 60;
    const /** @type {?} */ day = hr * 24;
    if (seconds < min) {
      // less than 1 min, update every 2 secs
      return 2;
    } else if (seconds < hr) {
      // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) {
      // less then a day, update every 5 mins
      return 300;
    } else {
      // update every hour
      return 3600;
    }
  }
}
