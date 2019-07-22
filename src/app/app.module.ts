import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiServiceProvider } from '../providers/service/api-service';
import { CommonServiceProvider } from '../providers/service/common-service';
import { UpdateServiceProvider } from '../providers/service/update-service';
import { FCM } from '@ionic-native/fcm';
import { Pro } from '@ionic/pro';
import {  Injectable, Injector } from '@angular/core';
import { GoogleMaps } from "@ionic-native/google-maps"
import { Network } from '@ionic-native/network';
import config from '../config';
import { TimeoutInterceptorProvider } from '../providers/service/timeout-interceptor';
import { Geolocation } from '@ionic-native/geolocation';
import { MapModalPage } from '../pages/map-modal/map-modal';
import { MapModalPageModule } from '../pages/map-modal/map-modal.module';

Pro.init('e5f285a6', {
  appVersion: config.version
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
    }
    const newFn = Pro.monitoring.wrap(() => {
      throw new Error('error');
    })
    newFn();
    Pro.monitoring.call(() => {
      throw new Error('error');
    })
    Pro.monitoring.log('This happens sometimes', { level: 'error' })    
    Pro.monitoring.exception(new Error('error'))
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}


@NgModule({
  declarations: [
    MyApp,
  ],

  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MapModalPageModule,
    IonicModule.forRoot(MyApp,
      {
        scrollAssist: false,
        autoFocusAssist: false
      }
    ),
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    IonicErrorHandler,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptorProvider, multi: true }],
    ApiServiceProvider,
    CommonServiceProvider,
    UpdateServiceProvider,
    FCM,
    Network,
    TimeoutInterceptorProvider,
    GoogleMaps,
    Geolocation
  ]
})
export class AppModule { }
