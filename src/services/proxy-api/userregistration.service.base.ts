import { Observable } from "rxjs";
import { IRegistration } from "../../app/dataModels/models/Registration";

export abstract class RegistrationServiceBase{

     abstract saveNewUser(UserDetails :IRegistration) : Observable<any>;
     abstract searchUserDetails(userId:number,user:string): Observable<any>;
     abstract getAllUserDetails(userType :string): Observable<any>;
     abstract deleteUsers(userIds : number[]) : Observable<any>;
     abstract getUserRegistrationDropDowns():Observable<any>;
}
