import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { IntroPage } from '../intro/intro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  provider = { loggedin: false, uid: '', name: '', email: '', profilePicture: '' };

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public ref: ChangeDetectorRef, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.updateProvideInfo();
  }

  updateProvideInfo() {
    var user = this.fire.auth.currentUser;
    if (user == null) {
      this.navCtrl.setRoot(IntroPage);
    } else {
      this.provider.loggedin = true;
      this.provider.uid = user.uid;
      this.provider.name = user.displayName;
      this.provider.email = user.email;
      this.provider.profilePicture = user.photoURL;
      this.ref.detectChanges();
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

  logout() {
    let loading = this.loadingCtrl.create({ content: 'Please wait...' });
    loading.present();
    this.fire.auth.signOut().then(() => {
      this.provider.loggedin = false;
      this.ref.detectChanges();
      loading.dismiss();
      this.navCtrl.setRoot(IntroPage);
    }).catch(error => {
      // Handle Errors here.
      this.showError(error);
      loading.dismiss();
    });
  }

  deleteAccount() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Account',
      message: 'Sure to delete your Account?',
      buttons: [
        { text: 'No' },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({ content: 'Please wait...' });
            loading.present();
            var user = this.fire.auth.currentUser;
            var that = this;
            user.delete().then(() => {
              // User deleted.
              let alert = this.alertCtrl.create({
                title: 'Account Deleted!',
                subTitle: 'Your account deleted successfully!',
                buttons: [{
                  text: 'Ok',
                  handler: data => {
                    that.provider.loggedin = false;
                    that.ref.detectChanges();
                    loading.dismiss();
                    this.navCtrl.setRoot(IntroPage);
                  }
                }]
              });
              alert.present();
            }).catch(error => {
              // Handle Errors here.
              this.showError(error);
              loading.dismiss();
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
