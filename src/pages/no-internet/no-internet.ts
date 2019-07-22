import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/service/api-service';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-no-internet',
  templateUrl: 'no-internet.html',
})
export class NoInternetPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiservice: ApiServiceProvider,
    private menuCtrl: MenuController,
    private network: Network
    ) {
  }

  connectNow() {
    this.apiservice.showLoading();
    if (['none', 'unknown'].some(status => this.network.type === status)) {
      this.menuCtrl.swipeEnable(false);
      this.apiservice.networkStateChange.emit(false);
      let activeNav = this.navCtrl.getActive().name;
      this.apiservice.disableBackbutton();
      if (activeNav != 'NoInternetPage') {
        this.navCtrl.push("NoInternetPage");
        this.apiservice.dismissLoading();
      }
      this.apiservice.dismissLoading();
    } else {
      this.menuCtrl.swipeEnable(true);
      this.apiservice.networkStateChange.emit(true);
      let activeNav = this.navCtrl.getActive().name;
      this.apiservice.enableBackbutton();
      if (activeNav == 'NoInternetPage') {
        this.navCtrl.pop();
        this.apiservice.dismissLoading();
      }
      this.apiservice.dismissLoading();
    }
  }

}
