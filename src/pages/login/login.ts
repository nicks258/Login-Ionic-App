import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  phoneNumber: any;
  lastName: any;
  firstName: any;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, private apiService: ApiProvider) {

  }
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Verify Mobile',
      inputs: [
        {
          name: 'title',
          placeholder: 'Enter OTP'
        },
      ],
      buttons: [
        {
          text: 'Verify',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  doLogin() {
    const loginData = new FormData();
    loginData.append('phone_number', this.phoneNumber);
    this.apiService.doPostCall('smsApplication/send-sms.php', loginData).subscribe(data=> {
      const jsonData = JSON.parse(JSON.stringify(data));
      console.log(jsonData);
    })
  }

}
