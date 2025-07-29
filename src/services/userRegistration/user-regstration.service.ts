import { Injectable } from '@angular/core';
import { RegistrationServiceBase } from '../proxy-api/userregistration.service.base';
import { Observable } from 'rxjs';
import { IRegistration, IuserRegistrationDropDowns } from '../../app/dataModels/models/Registration';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../config/api-endpoint-settings';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserRegstrationService extends RegistrationServiceBase {
  private readonly endpointUrl: string = environment.endPointUrl;
  private readonly authenticateUrl = 'api/UserRegistration';

   constructor(private httpClient: HttpClient) {
    super();
   }

   override saveNewUser(UserDetails: IRegistration): Observable<any> {
   const url = `${this.createUrl(this.endpointUrl, this.authenticateUrl)}`;
   return this.httpClient.post(url,UserDetails);
  }
  public override getUserRegistrationDropDowns(): Observable<any> {
    const url = `${this.createUrl(this.endpointUrl, this.authenticateUrl)}/GetUserDropDowns`;
    return this.httpClient.get<IuserRegistrationDropDowns[]>(url);
  }

  override searchUserDetails(userId: number, user: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  override getAllUserDetails(userType: string): Observable<any> {
    const url = `${this.createUrl(this.endpointUrl, this.authenticateUrl)}/GetUserDropDowns`;
    return this.httpClient.get<IuserRegistrationDropDowns[]>(url);
  }
  
  override deleteUsers(userIds: number[]): Observable<any> {
    throw new Error('Method not implemented.');
  }
  
  createUrl(env: string, rout: string) {
    return `${env + rout}`
  }
}
