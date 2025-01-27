import {Component, Input} from '@angular/core';
import {FullScreenLoadingComponent} from '../../components/full-screen-loading/full-screen-loading.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [
    FullScreenLoadingComponent,
    NgIf
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  @Input()
  loading: boolean = false;

}
