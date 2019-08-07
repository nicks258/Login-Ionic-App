import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import Swal from 'sweetalert2'
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  phoneNumber: string = '';
  lastName: string = '';
  firstName: string = '';
  otpMessage: any;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, private apiService: ApiProvider,
              private storage: Storage) {

  }
  showPrompt() {
    let env = this;
    const prompt = this.alertCtrl.create({
      title: 'Verify Mobile',
      inputs: [
        {
          name: 'otp',
          placeholder: 'Enter OTP',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Verify',
          handler: data => {
            console.log(data.otp);
            if (data.otp == this.otpMessage) {
              env.storage.set('isLogin','true').then(()=>{
                env.navCtrl.setRoot(HomePage);
              })
            } else {
              Swal.fire({
                title: 'Oops',
                text: 'Please check the opt you entered!',
                type: 'error',
                showCancelButton: true,
                confirmButtonText: 'Okay',
              }).then(()=>{
                env.showPrompt();
              })
            }
          }
        }
      ]
    });
    prompt.present();
  }
  doLogin() {
    if (this.firstName.length!=0 && this.lastName.length!=0 && this.phoneNumber.length!=0) {
      const loginData = new FormData();
      loginData.append('phone_number', this.phoneNumber);
      this.apiService.doPostCall('smsApplication/send-sms.php', loginData).subscribe(data=> {
        this.showPrompt();
        const jsonData = JSON.parse(JSON.stringify(data));
        this.otpMessage = jsonData.otp;
        console.log(this.otpMessage);
      })
    } else {
      Swal.fire({
        title: 'Something is missing!',
        text: 'Please fill all entries!',
        type: 'error',
        confirmButtonText: 'Okay',
      }).then(()=>{
      })
    }

  }

}
