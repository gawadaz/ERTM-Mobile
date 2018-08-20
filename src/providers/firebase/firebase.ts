import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  counters: {};
  countersSubscription: any;
  countersRef: AngularFireObject<{}>;
  klpeRef: AngularFireList<{}>;
  klpeNumbers: Observable<any[]>;
  electorsRef: AngularFireList<{}>;
  electors: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    // console.log('Hello FirebaseProvider Provider');
    this.countersRef = this.db.object('counters');
    this.getCounters();
  }

  getKlpes() {
    this.klpeRef = this.db.list('klpe');
    return this.klpeRef.snapshotChanges().pipe(
      map( items => {
        return items.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  getElectorsByKlpe(klpeNumber: any){
    // console.log(klpeNumber instanceof Number);
    const num: number = parseInt(klpeNumber);
    this.electorsRef = this.db.list('codes', ref => ref.orderByChild('Klpe').equalTo(num));
    return this.electorsRef.snapshotChanges().pipe(
      map( items => {
        return items.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  updateElector(elector: any) {
    this.electorsRef.update(elector.key, elector);
    this.counters['voted'] = this.counters['voted'] + 1
    this.updateVotedCounter({ 'voted': this.counters['voted'] });
  }

  updateVotedCounter(counter: any){    
    this.countersRef.update(counter);
  }

  getCounters(){
    this.countersSubscription = this.countersRef.valueChanges()
    .subscribe(data => {
      this.counters = data;
    });
  }

}
