import { Injectable } from '@angular/core';
import { MastersServicebase } from '../proxy-api/master-servivce.base';
import { map, Observable, of } from 'rxjs';
import { Masters } from '../../app/dataModels/common/common';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../config/api-endpoint-settings';

@Injectable({
  providedIn: 'root'
})
export class MasterService extends MastersServicebase {

  private readonly endpointUrl: string = environment.endPointUrl;
  private readonly authenticateUrl = 'api/Master';

  
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    super();
  }
  
   override getAllMasters(): Observable<Masters[]> {
    const userId = this.cookieService.get('user');
    const master = localStorage.getItem('masters');
    if (master && master !== 'undefined' && master !== null) {
      return of(JSON.parse(master || '{}'));
    }
    else {
      const url = `${this.endpointUrl + this.authenticateUrl}/GetAllMasters/${userId}`;
      return this.httpClient.get<any>(url).pipe(map(res => res.response));
    }
  }
}