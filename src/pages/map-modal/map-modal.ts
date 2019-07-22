import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMaps,
  Marker,
  MarkerOptions,
  GoogleMapsEvent,
  LatLng,
  CameraPosition
} from "@ionic-native/google-maps";
import { Coordinates, Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-map-modal',
  templateUrl: 'map-modal.html',
})
export class MapModalPage {
  @ViewChild("map") mapElement: ElementRef;
  map: GoogleMap;
  public location: Coordinates;


  constructor(
    public platform: Platform,
    private googleMaps: GoogleMaps,
    public geolocation: Geolocation,
    private viewController: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapModalPage');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit MapModalPage');
    this.getLocation().then((data) => {
      console.log('data', data);
      if (data) {
        this.initMap();
        this.addMarker();
      }
    });
  }

  initMap() {
    let element = this.mapElement.nativeElement;
    this.map = GoogleMaps.create(element);
  }


  dismissModal() {
    this.viewController.dismiss();
  }

  getLocation() {
    return new Promise((resolve) => {
      this.platform.ready().then(async () => {
        this.geolocation.getCurrentPosition().then((response: any) => {
          this.location = response.coords;
          resolve(true);
        })
          .catch((error) => {
            resolve(false);
          });
      });
    });
  }

  //Add marker on google map
  addMarker() {
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let loc = new LatLng(this.location.latitude, this.location.longitude);
      this.moveCamera(loc);
      this.createMarker(loc, "Location").then((marker: Marker) => {
        marker.showInfoWindow();
      }).catch(err => {
        console.log(err);
      });
    });
  }

  //Create marker
  createMarker(loc: LatLng, title: string) {
    let markerOption: MarkerOptions = {
      position: loc,
      title: title,
      draggable: true,
      icon: 'blue',
      animation: 'DROP',
    };
    return this.map.addMarker(markerOption);
  }

  //Move camera view on marked place
  moveCamera(loc: LatLng) {
    let options: CameraPosition<LatLng> = {
      target: loc,
      zoom: 20,
      tilt: 10
    };
    this.map.moveCamera(options);
  }

}
