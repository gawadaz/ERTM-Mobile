import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ElectorsPage } from '../electors/electors';
import { Page } from 'ionic-angular/navigation/nav-util';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  klpe: any;
  klpeList: Array<any> = [1,2,3,4,5,6,7,8,9,10];

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
    this.getKlpes();
  }

  itemSelected(item: any) {
    // console.log("item: " + item);
    this.navCtrl.push(ElectorsPage, { selelctedKlpe: item.key});
  }

  getKlpes(){
    this.firebaseProvider.getKlpes().subscribe( items => {
      const klpeNumbers = items;
      this.klpeList = klpeNumbers;
      // console.log('klpe: ' + JSON.stringify(items));
    });
  }

}
