import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, Content, Platform } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import * as moment from 'moment';
import { ApiServiceProvider } from '../../providers/service/api-service';
import { CommonServiceProvider } from '../../providers/service/common-service';
import { AddressModalPage } from '../address-modal/address-modal';
import { ModalController } from 'ionic-angular';
import { Coordinates, Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private events: Events,
    private viewController: ViewController
  ) {
    this.menuCtrl.enable(true);
  }

  ionViewDidEnter() {
  }

  goToItemDetail(data) {
    this.navCtrl.push('AddAddressPage', {
      id: ''
    });
  }
}
