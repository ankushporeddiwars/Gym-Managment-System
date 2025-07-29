import { Injectable } from '@angular/core';
import { AllUsersBase } from '../proxy-api/allUsers-service-base';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../config/api-endpoint-settings';
import { IUsers } from '../../app/dataModels/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AllUserService extends AllUsersBase{
  private readonly endpointUrl: string = environment.endPointUrl;
  private readonly authenticateUrl = 'api/ShowAllUsers';

  constructor(private httpClient: HttpClient) {
    super();
   }


  override getAllUserDetails(): Observable<any> {
    const url = `${this.createUrl(this.endpointUrl, this.authenticateUrl)}`;
    return this.httpClient.get<IUsers[]>(url);
  }

  createUrl(env: string, rout: string) {
    return `${env + rout}`
  }
}
