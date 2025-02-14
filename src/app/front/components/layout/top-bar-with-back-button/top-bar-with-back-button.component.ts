import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {Location} from '@angular/common';

@Component({
  selector: 'app-top-bar-with-back-button',
  imports: [
    Button
  ],
  templateUrl: './top-bar-with-back-button.component.html',
  styleUrl: './top-bar-with-back-button.component.scss'
})
export class TopBarWithBackButtonComponent {

    constructor(
      public location: Location,
    ) {
    }
}
