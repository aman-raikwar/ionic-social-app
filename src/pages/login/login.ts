import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = 'test@test.com';
  password: string = '123456';
  //public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private fire: AngularFireAuth) {

  }

  ionViewDidLoad() {
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    //   'size': 'invisible'
    // });
  }

  login(provider) {
    let signInProvider = null;
    switch (provider) {
      case 'facebook':
        signInProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'google':
        signInProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'github':
        signInProvider = new firebase.auth.GithubAuthProvider();
        break;
    }

    let loading = this.loadingCtrl.create({ content: 'Please wait...' });
    loading.present();

    if (provider === 'web') {
      this.fire.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
        this.reset();
        this.ref.detectChanges();
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
      }).catch(error => {
        // Handle Errors here.
        this.showError(error);
        loading.dismiss();
      });
    } else {
      this.fire.auth.signInWithPopup(signInProvider).then(res => {
        this.ref.detectChanges();
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
      }).catch(error => {
        // Handle Errors here.
        this.showError(error);
        loading.dismiss();
      });
    }
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
    this.email = '';
    this.password = '';
  }

  // loginWithPhoneNumber(phoneNumber: number) {
  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+" + phoneNumber;

  //   this.fire.auth.signInWithPhoneNumber(phoneNumberString, appVerifier)
  //     .then(confirmationResult => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       let prompt = this.alertCtrl.create({
  //         title: 'Enter the Confirmation code',
  //         inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
  //         buttons: [
  //           {
  //             text: 'Cancel',
  //             handler: data => { console.log('Cancel clicked'); }
  //           },
  //           {
  //             text: 'Send',
  //             handler: data => {
  //               // Here we need to handle the confirmation code
  //               confirmationResult.confirm(data.confirmationCode)
  //                 .then(function (result) {
  //                   // User signed in successfully.
  //                   console.log(result.user);
  //                 }).catch(function (error) {
  //                   // User couldn't sign in (bad verification code?)                    
  //                 });
  //             }
  //           }
  //         ]
  //       });
  //       prompt.present();
  //     })
  //     .catch(function (error) {
  //       this.showError(error);
  //       console.error("SMS not sent", error);
  //     });
  // }

}
