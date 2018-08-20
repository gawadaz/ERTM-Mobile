import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ElectorDataPage } from '../elector-data/elector-data';

/**
 * Generated class for the ElectorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-electors',
  templateUrl: 'electors.html',
})
export class ElectorsPage {

  electorsList: Array<any>;
  selectedKlpe: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    this.selectedKlpe = navParams.get('selelctedKlpe');
    // console.log('klpe: ' + this.selectedKlpe);    
  }

  ionViewDidLoad() {
   //  console.log('ionViewDidLoad ElectorsPage');
    this.getElectorsByKlpe(this.selectedKlpe);
  }

  getElectorsByKlpe(selectedKlpe: any): any {
    this.firebaseProvider.getElectorsByKlpe(selectedKlpe)
    .subscribe( data => {
      // console.log('electors: ' + JSON.stringify(data));
      const electors = data;
      this.electorsList = electors.filter(this.isNotVoted).sort(this.sortBySeqNumber);
    });
  }

  itemSelected(item: any) {
    // console.log('selected: ' + item);
    this.navCtrl.push(ElectorDataPage, { elector: item});
  }

  isNotVoted(element, index, array){
    return (element.Vote !=='כן' && element.Vote !== 'TRUE');
  }

  sortBySeqNumber(e1, e2) : number{
    if(e1.SeqNumber > e2.SeqNumber) return 1;
        if (e1.SeqNumber < e2.SeqNumber) return -1;
        return 0;
  }

}
