import { Injectable, EventEmitter, Output } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';
import { Pro } from '@ionic/pro';
import * as moment from 'moment';
// import { Observable } from 'rxjs/Rx';
// import { ApiServiceProvider } from './api-service';

@Injectable()
export class CommonServiceProvider {
  @Output() networkState = new EventEmitter;

  constructor(
      public toastCtrl: ToastController,
      public platform: Platform,
      // private apiservice: ApiServiceProvider
  ) {
  }

  showToastMessage(message) {
      Pro.monitoring.exception(new Error(message));
      let toast = this.toastCtrl.create({
          message: message,
          duration: 3000
      });
      toast.present();
  }

  showDelayedToastMessage(message) {
      Pro.monitoring.exception(new Error(message));
      let toast = this.toastCtrl.create({
          message: message,
          duration: 6000
      });
      toast.present();
  }

  formatAMPM(date) {
      var temp = date.split(':');
      var hours = temp[0];
      var minutes = temp[1];
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
  }

  detectPlatform() {
    let platform;
    if (this.platform.is('ios')) {
      platform = 'iOS';
    } else if (this.platform.is('android')) {
      platform = 'Android';
    }
    return platform;
  }

  minuteDiffrence(dt2, dt1) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  isSame(date1, date2) {
    var date = moment(new Date(date1)).format('MM-DD-YYYY');
    console.log(date);
    var month1 = (date+'').split('-')[0];
    var day1 = (date+'').split('-')[1];
    var year1 = (date+'').split('-')[2];

    date = moment(date2).format('MM-DD-YYYY');
    console.log(date);
    var month2 = (date+'').split('-')[0];
    var day2 = (date+'').split('-')[1];
    var year2 = (date+'').split('-')[2];

    if (year1 == year2) {
      if (month1 == month2) {
        if (day1 == day2) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
