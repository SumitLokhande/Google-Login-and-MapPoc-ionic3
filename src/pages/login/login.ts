import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private googlePlus: GooglePlus,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 login(){
  this.googlePlus.login({})
  .then((res)=>{
      const toast = this.toastCtrl.create({
        message: 'Login Successful',
        duration: 3000
      });
      toast.present();
      this.navCtrl.push(HomePage);
  })
  .catch(err => console.error(err));
 }
}
