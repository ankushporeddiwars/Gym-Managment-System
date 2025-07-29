import {Observable} from 'rxjs';

export abstract class RenewalBase
{
    abstract getUserDetails(): Observable<any>;
}