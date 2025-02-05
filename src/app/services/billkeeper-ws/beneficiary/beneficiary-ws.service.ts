import { Injectable } from '@angular/core';
import {HttpWsService} from '../http-ws.service';
import {Beneficiary} from './model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryWsService {

  constructor(
    private httpWsService: HttpWsService
  ) { }

  async getAllBeneficiaries(): Promise<Beneficiary[]> {
    return this.httpWsService.get<Beneficiary[]>("/beneficiaries")
  }
}
