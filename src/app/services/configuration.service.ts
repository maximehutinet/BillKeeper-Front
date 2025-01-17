import { Injectable } from '@angular/core';
import {Configuration} from "./model/configuration";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  configuration!: Configuration;
}
