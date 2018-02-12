import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private fire: AngularFireAuth) {
  }

  register() {
    let loading = this.loadingCtrl.create({ content: 'Please wait...' });
    loading.present();
    var username = this.name;

    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
      user.updateProfile({
        displayName: username
      }).then(() => {
        // Update successful.
        this.reset();
        //this.updateProvideInfo(user);
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }).catch(error => {
        // Handle Errors here.
        this.showError(error);
        loading.dismiss();
      });
    }).catch(function (error) {
      // Handle Errors here.
      this.showError(error);
      loading.dismiss();
    });
  }

  showError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: errorMessage,
      buttons: [{ text: 'Ok' }]
    });
    alert.present();
  }

  reset() {
    this.name = '';
    this.email = '';
    this.password = '';
  }

}
