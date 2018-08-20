import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the ElectorDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-elector-data',
  templateUrl: 'elector-data.html',
})
export class ElectorDataPage {

  elector: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController) {
    this.elector = navParams.get('elector');
      // console.log(JSON.stringify(this.elector));
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ElectorDataPage');
  }

  electorVoted(elector: any) {
    this.showConfirmAlert(elector);
  }

  showConfirmAlert(elector){
    const confirm = this.alertCtrl.create({
      title: 'אתה בטוח?',
      message: 'אתה עומד לשנות סטוטס של בוחר להצביע',
      buttons: [
        {
          text: 'לאאאאא',
          handler: () => {
            // console.log('Disagree clicked');
          }
        },
        {
          text: 'כן',
          handler: () => {
            // console.log('Agree clicked');
            const voted = 'כן';
            elector.Vote = voted;
            // console.log('elector: ' + JSON.stringify(elector));
            this.firebaseProvider.updateElector(elector);   
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
