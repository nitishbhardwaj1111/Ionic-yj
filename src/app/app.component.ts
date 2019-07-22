import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription } from 'rxjs';
import { FCM } from '@ionic-native/fcm';
import { ApiServiceProvider } from '../providers/service/api-service';
import { CommonServiceProvider } from '../providers/service/common-service';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  unRegister : any;

  private onResumeSubscription: Subscription;
  rootPage: any = 'HomePage';
  pages: Array<{ title: string, component: any }>;
  username: string = localStorage.getItem('name');
  mobileNumber: string = localStorage.getItem('mobile');
  menus = [];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    private fcm: FCM,
    public splashScreen: SplashScreen,
    private apiservice: ApiServiceProvider,
    private commonService: CommonServiceProvider,
    public events: Events,
    public alertCtrl: AlertController,
    private menuCtrl: MenuController,
    public geolocation: Geolocation,
    private network: Network
  ) {
    this.network.onDisconnect().subscribe(() => {
      this.disconnectInternet();
    });
    this.network.onConnect().subscribe(() => {
      this.connectinternet();
    });
    this.initializeApp();
    events.subscribe('loggedIn', () => {
      this.mobileNumber = localStorage.getItem('mobile');
      this.username = localStorage.getItem('name');
    });
    this.commonService.networkState.subscribe(connected => {
      if(connected) {
        this.disconnectInternet();
      } 
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      localStorage.setItem('filterDeliveryType', 'all');
      localStorage.setItem('filterFoodType', 'all');
      const storeTime = new Date();
      localStorage.setItem('dateTimeForPlanner', storeTime+'');
      this.detectPlatform();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getLocation();
    });
    this.getMenu();
  }

  async getLocation() {
    const { coords } = await this.geolocation.getCurrentPosition();
  }

  disconnectInternet() {
    this.menuCtrl.swipeEnable(false);
    this.apiservice.networkStateChange.emit(false);
    let activeNav = this.nav.getActive().name;
    this.apiservice.disableBackbutton();
    if (activeNav != 'NoInternetPage') {
      this.nav.push("NoInternetPage");
    }
    this.apiservice.dismissLoading();
  }

  connectinternet() {
    this.menuCtrl.swipeEnable(true);
    this.apiservice.networkStateChange.emit(true);
    let activeNav = this.nav.getActive().name;
    this.apiservice.enableBackbutton();
    if (activeNav == 'NoInternetPage') {
      this.nav.pop();
    }
  }

  detectPlatform() {
    if (this.platform.is('ios')) {
      localStorage.setItem('platform', 'iOS');
    } else if (this.platform.is('android')) {
      localStorage.setItem('platform', 'Android');
    }
  }

  fcmNotification() {
    this.fcm.onNotification().subscribe(data => {
    });
  }

  ngOnDestroy() {
    this.onResumeSubscription.unsubscribe();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  favoritesPage() {
    this.nav.push('FavouritesPage');
  }

  reviewPage() {
    this.nav.push('ReviewsPage');
  }

  feedback() {
    this.platform.ready().then(() => {
      window.open('mailto:' + 'support@yummjoy.com' + '?subject=Feedback');
    });
  }

  resetPin() {
    this.nav.push('ResetPinPage');
  }

  homePage() {
    // const apartmentId = localStorage.getItem('apartmentId');
    // const areaId = localStorage.getItem('apartmentId');
    // const cityId = localStorage.getItem('apartmentId');
    // if (apartmentId && areaId && cityId) {
      this.nav.setRoot('HomePage', {
        menus: this.menus,
      });
    // } else {
    //   this.commonService.showToastMessage('No apartment selected');
    //   this.nav.popToRoot();
    // }
  }

  notification() {
    this.nav.push('NotificationPage');
  }

  aboutPage() {
    this.nav.push('AboutUsPage');
  }

  supportPage() {
    this.platform.ready().then(() => {
      window.open('mailto:' + 'support@yummjoy.com');
    });
  }

  contactPage() {
    this.nav.push('ContactUsPage');
  }

  detailsPage() {
    this.nav.push('MyDetailsPage');
  }

  myOrders() {
    this.nav.push('MyOrderPage');
    // this.nav.setRoot('MyOrderPage');
  }

  rateUsPage() {
    this.nav.push('RateUsPage');
  }

  Signup() {
    this.nav.push('SigninPage');
  }

  logoutButtonClicked() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure ?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            localStorage.clear();
            localStorage.setItem('filterDeliveryType', 'all');
            localStorage.setItem('filterFoodType', 'all');
            const storeTime = new Date();
            localStorage.setItem('dateTimeForPlanner', storeTime+'');
            this.nav.setRoot('HomePage', {
              menus: this.menus,
            });
            this.nav.popToRoot();
            // localStorage.setItem('apiUrl', config.apiUrl);
            // localStorage.setItem('version', config.version);
            this.username = '';
            this.mobileNumber = '';
          }
        }
      ]

    });
    confirm.present();
  }

  getMenu() {
  }

  checkUserName(){
    return new Promise((resolve) => {
      let name =  localStorage.getItem('name');
        if (name == ""){
        this.username = null;
        this.mobileNumber = null;
        localStorage.clear();
        this.nav.push('SigninPage');
        resolve(true)
      }else{
        resolve(false)
      }
    })
  }

}
