import { Observable } from "rxjs";
import { LoginCredentials } from "../../app/dataModels/loginCredentials";

export abstract class LoginServicebase {
    public IsLoggedIn!: boolean;
    abstract login(data: LoginCredentials): Observable<any>;
    abstract LogOut(): void;
    abstract getCookieValue(key: string): string;
    abstract checkCookieValue(key: string): boolean;
    abstract refreshAuthToken(): Observable<any>;
}