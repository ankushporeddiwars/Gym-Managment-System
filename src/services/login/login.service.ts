import { Injectable } from '@angular/core';
import { LoginServicebase } from '../proxy-api/login-service.base';
import { Observable } from 'rxjs';
import { LoginCredentials } from '../../app/dataModels/loginCredentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../config/api-endpoint-settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends LoginServicebase {
  
  private readonly endpointUrl: string = environment.endPointUrl;
  private readonly authenticateUrl = 'api/Authenticate';

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private router: Router) {
    super();
  }
   public override login(data: LoginCredentials): Observable<any> {
    const body = JSON.stringify(data);
    const url = this.createUrl(this.endpointUrl, this.authenticateUrl) + '/' + 'login';
    return this.http.post(url, body, { headers: this.addHeader() });
  }

  public override LogOut(): void {
    this.router.navigate(['/login']);
    this.cookieService.deleteAll('/', 'localhost');
    localStorage.removeItem('masters');
  }

  addHeader(): HttpHeaders {
    let token = this.cookieService.get('token');

    const headers = new HttpHeaders()
      .set('content-type', 'application/json; charset=utf-8')
      .set('Access-Control-Allow-Origin', '*');

    if (token) {
      headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getCookieValue(key: string): string {
    return this.cookieService.get(key);
  }

  checkCookieValue(key: string): boolean {
    return this.cookieService.check(key);
  }
  refreshAuthToken(): Observable<any> {
    const body = { Token: this.getCookieValue('token'), Refresh_Token: this.cookieService.get('refreshToken') };
    const url = this.createUrl(this.endpointUrl, this.authenticateUrl) + '/' + 'refresh';
    return this.http.post(url, body);
  }

  createUrl(env: string, rout: string) {
    return `${env + rout}`
  }
}
