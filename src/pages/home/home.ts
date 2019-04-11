
import { GooglePlus } from '@ionic-native/google-plus';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';


declare var google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  constructor(public platform: Platform ,public navCtrl: NavController,private googlePlus: GooglePlus,public alertCtrl: AlertController,public toastCtrl: ToastController,private geolocation: Geolocation) {
    platform.ready().then(() => {
      console.log("1 achived ")
      this.initMap();
    });
  }
  ionViewDidLoad() {
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   console.log(resp.coords.latitude,"latitude");
    //   console.log(resp.coords.longitude,"longitude");

    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
  }

  initMap() {
    console.log("2 achived ")
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15
      });
  
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: {lat: location.coords.latitude, lng: location.coords.longitude},
        radius: 10000,
        type: ['Hospital']
      }, (results,status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
          }
        }
      });
    }, (error) => {
      console.log(error);
    }, options);
    var myplace = {lat: -33.8665, lng: 151.1956};
  }

  createMarker(place) {
    var placeLoc = place.geometry.location;

    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc,
      icon: image
    });
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });

    
  
    google.maps.event.addListener(marker, 'click', function() {
      // infowindow.setContent(place.name);
      // infowindow.open(map, this);

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
      'Place ID: ' + place.place_id + '<br>' +
      place.vicinity + '</div>');
    infowindow.open(map, this);
    });
  }
  logout(){

      const confirm = this.alertCtrl.create({
        title: 'Logout?',
        message: 'Do you want to Logout?',
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Agree',
            handler: () => {
              this.googlePlus.logout().then((res)=>{
                const toast = this.toastCtrl.create({
                  message: 'Logout Successful',
                  duration: 3000
                });
                toast.present();
                this.navCtrl.setRoot(LoginPage);
              }).catch((err)=>{
             console.log(err);
              })
            }
          }
        ]
      });
      confirm.present();

  }
}
