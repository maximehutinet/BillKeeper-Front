import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  updateSideMenu: Subject<void> = new Subject();

}
