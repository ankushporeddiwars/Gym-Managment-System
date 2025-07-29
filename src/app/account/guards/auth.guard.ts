import { inject, Inject } from "@angular/core"
import { LoginService } from "../../../services/login/login.service"
import { Router } from "express";
import { CanActivate, CanActivateChildFn, CanActivateFn } from "@angular/router";

//added function with any name we have tooked here is CanActivated
  export const CanActivated = () =>{
    const loginService = Inject(LoginService);
    const router = Inject(Router);
    const isLoggedIn = loginService.getCookieValue('token') ? true : false;
    if(isLoggedIn)
    {
      return true;
    }
    else{
        router.navigate(['/login']);
        return false;
    }
  }
