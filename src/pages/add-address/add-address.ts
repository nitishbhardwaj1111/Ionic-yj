import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CommonServiceProvider } from '../../providers/service/common-service';
import { Coordinates, Geolocation } from '@ionic-native/geolocation';
import { ModalController } from 'ionic-angular';
import { MapModalPage } from '../map-modal/map-modal';

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html'
})
export class AddAddressPage {

  totalCartItems = 0;
  buttonText = '';
  apartment = '';
  area = '';
  city = '';
  state = '';
  addressId = '';
  street = '';
  doorNumber = '';
  country = '';
  apartmentId = '';
  compeleteGoogleAddress = '';
  type = '';
  public location: Coordinates;

  constructor(
    public platform: Platform,
    public geolocation: Geolocation,
    public navCtrl: NavController,
    private commonService: CommonServiceProvider,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.getLocation().then((data) => {
      if (data) {
        this.apartmentId = localStorage.getItem('apartmentId');
        this.getAddressFromLocation();
        this.addressId = this.navParams.get('id');
        if (this.addressId != undefined && this.addressId != null && this.addressId != '') {
          this.getAddress();
          this.buttonText = 'Submit';
        } else {
          this.buttonText = 'Submit';
        }
      }
    });
  }

  getAddressFromLocation() {
    return new Promise((resolve) => {
      const sendData = {
        latlng: this.location.latitude + ',' + this.location.longitude,
        key: "AIzaSyDQSxalRwLsUCKkc2ZicJ6mb-fD6rWsryM"
      };
      resolve (true);
    });
  }

  getDataFromLocation(response, type1, type) {
    return new Promise((resolve) => {
      console.log("response", response);
      response.results.map((item, index) => {
        let flag = false;
        let city;
        const temp = item.types.filter((item_) => {
          return item_ == type;
        });
        if (temp.length > 0) {
          item.address_components.map((address_components_item) => {
            const temp_ = address_components_item.types.filter((item_) => {
              return item_ == type;
            });
            if (temp_.length > 0) {
              city = address_components_item.long_name;
              flag = true;
            }
          })
        }
        if (flag) {
          resolve (city);
          return ;
        }
      });
    })
  }

  getLocation() {
    return new Promise((resolve) => {
      this.platform.ready().then(async () => {
        this.geolocation.getCurrentPosition().then((response: any) => {
          this.location = response.coords;
          resolve (true);
        })
        .catch((error) => {
          resolve (false);
        });
      });
    });
  }

  getAddress() {
  }

  getCartItems() {
  }

  openMapModal() {
    let contactModal = this.modalCtrl.create(MapModalPage, { enableBackdropDismiss: false });
    contactModal.onDidDismiss(data => {
    });
    contactModal.present();
  }

  onSave() {
    if (this.type == '' || this.type == undefined || this.type == null) {
      this.commonService.showToastMessage("Please enter address type");
      return false;
    }
    if (this.apartment == '' || this.apartment == undefined || this.apartment == null) {
      this.commonService.showToastMessage("Please enter Apartname/Building name");
      return false;
    }
    if (this.doorNumber == '' || this.doorNumber == undefined || this.doorNumber == null) {
      this.commonService.showToastMessage("Please enter door number/block or company name");
      return false;
    }
    if (this.area == '' || this.area == undefined || this.area == null) {
      this.commonService.showToastMessage("Please enter area");
      return false;
    }
    if (this.city == '' || this.city == undefined || this.city == null) {
      this.commonService.showToastMessage("Please enter city");
      return false;
    }
    if (this.state == '' || this.state == undefined || this.state == null) {
      this.commonService.showToastMessage("Please enter state");
      return false;
    }
    if (this.country == '' || this.country == undefined || this.country == null) {
      this.commonService.showToastMessage("Please enter country");
      return false;
    }
    const sendData = {
      apartment: this.apartment,
      area: this.area,
      city: this.city,
      state: this.state,
      street: this.street,
      userId: localStorage.getItem('userId'),
      accessToken: localStorage.getItem('accessToken'),
      addressId: '',
      doorNumber: this.doorNumber,
      country: this.country,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      type: this.type,
      compeleteGoogleAddress: this.compeleteGoogleAddress,
      apartmentId: this.apartmentId
    }
    if (this.addressId == '' || this.addressId == undefined || this.addressId == '') {
      this.addAddress(sendData);
    } else if (this.addressId != '' && this.addressId != undefined && this.addressId != '') {
      sendData.addressId = this.addressId;
      this.updateAddress(sendData);
    }
  }

  addAddress(data) {
  }

  updateAddress(data) {
  }

  nullify() {
    this.apartment = '';
    this.area = '';
    this.city = '';
    this.state = '';
  }

}
