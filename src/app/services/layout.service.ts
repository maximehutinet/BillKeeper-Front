import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public pageLoading = false;

  constructor() { }

  async withPageLoading(fn: () => Promise<void>) {
    try {
      this.pageLoading = true;
      await fn();
      this.pageLoading = false;
    } catch (e) {
      this.pageLoading = false
      throw e;
    }
  }

}
