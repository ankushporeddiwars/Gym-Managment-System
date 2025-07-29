//Below is the old approch that was implemented using Interface

import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { stat } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild{
  isLoggedIn = false;
  constructor(private loginService: LoginService,
    private router: Router,
    private toastrService :ToastrService) {
  }

  canActivate(): boolean {
    this.isLoggedIn = this.loginService.getCookieValue('token') ? true : false;
    if (this.isLoggedIn) {
      return true;
    }
    else {
      //return this.router.parseUrl('/login');      
       this.router.navigate(['/login']);
       return false
    }
  }

canActivateChild(): boolean {
    this.isLoggedIn = this.loginService.getCookieValue('token') ? true : false;
    if (this.isLoggedIn) {
      return true; // Grant access to child routes
    } else {
      this.router.navigate(['/login']); // Redirect to login
      return false;
    }
  }
}