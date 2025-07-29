import { Injectable } from '@angular/core';
import {RenewalBase} from '../proxy-api/RenewalBase'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../config/api-endpoint-settings';
@Injectable({
  providedIn: 'root'
})
export class UserRenewalService extends RenewalBase {
  
  private readonly endpointUrl: string = environment.endPointUrl;
  private readonly getUserUrl = 'api/UserRenewal';

  constructor(private httpClient:HttpClient) { 
   super()
  }
  override getUserDetails(): Observable<any> {
    const url = this.createUrl(this.endpointUrl,this.getUserUrl);
    return this.httpClient.get<any>(url);
  }

  createUrl(env: string, rout: string) {
    return `${env + rout}`
  }
}
