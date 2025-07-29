import { Observable } from "rxjs";

export abstract class AllUsersBase
{
    abstract getAllUserDetails(): Observable<any>;
}