import { promises } from "dns";
import { Observable } from "rxjs";

export interface IDeActivatedComponent{
    CanExit:()=>boolean | Observable<boolean> | Promise<boolean>;
}