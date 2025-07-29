import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { UserRegistrationComponent } from "../../main/user-registration/user-registration.component";
import { IDeActivatedComponent } from "./Interface/IdeActivatedGuard";

@Injectable({
    providedIn: 'root'
  })
  export class DeActivatedGuard implements CanDeactivate<IDeActivatedComponent>{
   
    canDeactivate(component: IDeActivatedComponent, currentRoute: ActivatedRouteSnapshot, 
      currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return component.CanExit();
    }

  }

  export const canDeactivateGuard = (component: any) => {
    return component.canExit ? component.canExit() : true;
  };