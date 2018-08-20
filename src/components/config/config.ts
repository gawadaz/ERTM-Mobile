import { Component } from '@angular/core';

/**
 * Generated class for the ConfigComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'config',
  templateUrl: 'config.html'
})
export class ConfigComponent {

  text: string;

  constructor() {
    console.log('Hello ConfigComponent Component');
    this.text = 'Hello World';
  }

}
