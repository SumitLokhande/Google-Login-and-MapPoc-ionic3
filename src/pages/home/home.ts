
import { GooglePlus } from '@ionic-native/google-plus';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Subscription } from 'rxjs/Subscription';
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
  private onResumeSubscription: Subscription;
  constructor(private openNativeSettings: OpenNativeSettings,private diagnostic: Diagnostic,public platform: Platform ,public navCtrl: NavController,private googlePlus: GooglePlus,public alertCtrl: AlertController,public toastCtrl: ToastController,private geolocation: Geolocation) {
    this.diagnostic.isGpsLocationEnabled().then((res)=>{
      console.log(res,"diagnostics");
      if(res){
        console.log("1 achived ")
        this.initMap();
      } else {
        const confirm = this.alertCtrl.create({
          title: 'Use this lightsaber?',
          message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
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
                this.openNativeSettings.open('location');
              }
            }
          ]
        });
        confirm.present();
      }
      
    })
    this.onResumeSubscription = platform.resume.subscribe(() => {
      this.initMap();
      // do something meaningful when the app is put in the foreground
   }); 
  }
  ionViewDidLoad() {
   
  }

  initMap() {
    console.log("2 achived ")
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);

      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15
      });
  console.log("map object ", map);

      infowindow = new google.maps.InfoWindow();

      console.log("infowidnow ",infowindow)

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: {lat: location.coords.latitude, lng: location.coords.longitude},
        radius: 1000,
        type: ['hospital']
      }, (results,status) => {
        console.log(" result ",results);
        console.log(" status ",status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(" stattus condition  ",status)
          for (var i = 0; i < results.length; i++) {
            console.log(" Creating marker ")
            this.createMarker(results[i]);
          }
        }
      });
    }, (error) => {
      console.log(error);
    }, options);
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

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<br>' +
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
