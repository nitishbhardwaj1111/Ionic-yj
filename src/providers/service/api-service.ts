
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Loading, LoadingController, Platform, App, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/do';
import config from '../../config';
import { FCM } from '@ionic-native/fcm';
import { Network } from '@ionic-native/network';
import { of } from 'rxjs/observable/of';
import { CommonServiceProvider } from './common-service';

var _this;
@Injectable()
export class ApiServiceProvider {
  @Output() networkStateChange = new EventEmitter;
  public apiUrl: string = config.apiUrl;
  unRegister: any;

  loading: Loading = null;

  constructor(
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    private fcm: FCM,
    private network: Network,
    public platform: Platform,
    public app: App,
    private commonService: CommonServiceProvider
  ) {
    _this = this;
  }

  showLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({ content: "Please Wait..." });
      this.loading.present();
    }
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  public disableBackbutton() {
    this.unRegister = this.platform.registerBackButtonAction(() => {}, 1);
  }
  
  public enableBackbutton() {
    this.unRegister();
  }

  private handleError(error: Response) {
    // if (error && error['name'] == 'TimeoutError') {
      _this.commonService.networkState.emit(true);
    // }
    return Observable.throw(error.statusText);
  }

  public checkNetwork() {
    if (['none', 'unknown'].some(status => this.network.type === status)) {
      this.commonService.showToastMessage("No Internet Connection.");
      return false;
    } else { 
      return true;
    }
  }


  // get device token 
  getDeviceToken() {
    return this.fcm.getToken().then(token => {
      return token;
    });
  }

  
  // ================ Common handlings ================= //

  post(urlExtension, data) {
    if (['none', 'unknown'].some(status => this.network.type === status)) {
      return of({
          status: 200,
          message: "",
          result: {}
      });
    } else {
    this.showLoading();
    return this.http.post(this.apiUrl + urlExtension, data)
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError)
      .finally(() => {
        this.dismissLoading();
      });
    }
  }
  
  get(urlExtension, data) {
    if (['none', 'unknown'].some(status => this.network.type === status)) {
      return of({
          status: 200,
          "message": "",
          "result": {}
      });
    } else {
    this.showLoading();
    return this.http.get(this.apiUrl + urlExtension, { params: data })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError)
      .finally(() => {
        this.dismissLoading();
      });
  }
}
simpleGet(urlExtension, data) {
    if (['none', 'unknown'].some(status => this.network.type === status)) {
      return of({
          status: 200,
          "message": "",
          "result": {}
      });
    } else {
    this.showLoading();
    return this.http.get(urlExtension, { params: data })
      .map((response: Response) => {
        return response;
      })
      .catch(this.handleError)
      .finally(() => {
        this.dismissLoading();
      });
  }
}

}
