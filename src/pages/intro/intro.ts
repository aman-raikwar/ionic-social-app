import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  showLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  showRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

}
