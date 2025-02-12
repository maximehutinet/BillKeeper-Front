import {Component} from '@angular/core';
import {ProgressSpinner} from "primeng/progressspinner";

@Component({
  selector: 'app-full-screen-loading',
  imports: [
    ProgressSpinner
  ],
  templateUrl: './full-screen-loading.component.html',
  styleUrl: './full-screen-loading.component.scss'
})
export class FullScreenLoadingComponent {

}
