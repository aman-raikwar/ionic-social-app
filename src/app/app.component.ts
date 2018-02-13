import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { PhotoPage } from '../pages/photo/photo';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { ContactPage } from '../pages/contact/contact';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav; 

  rootPage: any = ContactPage;  

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusbar: StatusBar, public splashscreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: TabsPage },
      //{ title: 'About', component: AboutPage },
      //{ title: 'Contact', component: ContactPage },
      { title: 'Camera', component: PhotoPage },
      { title: 'Account', component: AccountPage },
      { title: 'Settings', component: SettingsPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  initializeApp() {
    this.platform.ready().then(() => {      
      this.statusbar.styleDefault();
      this.splashscreen.hide();
    });
  }
  
}

