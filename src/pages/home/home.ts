import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  gaming: any;
  water: number = 0;
  earth: number = 5;
  fire:  number  = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  minusWater() {
    if (this.water>0){
      this.water = this.water - 1;
    }
  }

  minusEarth() {
    if (this.earth>0) {
      this.earth = this.earth - 1;
    }
  }

  minusFire() {
    if (this.fire>0) {
      this.fire = this.fire - 1;
    }
  }

  addWater() {
    this.water = this.water + 1;
  }

  addEarth() {
    this.earth = this.earth + 1;
  }

  addFire() {
    this.fire = this.fire + 1;
  }

  backToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}
