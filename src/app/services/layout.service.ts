import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public pageLoading = false;

  constructor() { }

  async withPageLoading(fn: () => Promise<void>) {
    this.pageLoading = true;
    await fn();
    this.pageLoading = false;
  }

}
