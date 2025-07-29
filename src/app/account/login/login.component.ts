import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServicebase } from '../../../services/proxy-api/login-service.base';
import { LoginService } from '../../../services/login/login.service';
import { LoginCredentials } from '../../dataModels/loginCredentials';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[{
    provide:LoginServicebase, useClass: LoginService}],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginError: string = '';
  subscription!: Subscription;

  loginForm: FormGroup = new FormGroup({
    Username: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });

  constructor(private loginService: LoginServicebase,
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService) { }
    
    activeRoute : ActivatedRoute = Inject(ActivatedRoute);

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((queries)=>{
      const logout = Boolean(queries.get('logout'));
      if(logout){
        this
      }
    })
  }

  userLogin(): void {
    if (this.loginForm.valid) {
      const loginModel: LoginCredentials = {
        Username: this.loginForm.controls['Username'].value!,
        Password: this.loginForm.controls['Password'].value!
      }
      
      this.subscription = this.loginService
        .login(loginModel)
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.loginError = '';
              this.loginForm.reset();
              this.setAuthToken(res);
              this.router.navigate(['/main/dashboard']);
            } else {
              this.loginError = 'Invalid email and password combination!';
              this.toastrService.error('Invalid email and password combination..!!');
            }

          },
          error: (error: any) => {
            this.loginError = 'An error occurred during login.';
            this.toastrService.error('An error occurred during login');
            this.cookieService.deleteAll();
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (!this.subscription) {
      return;
    } else {
      return this.subscription.unsubscribe();
    }
  }

  setAuthToken(res: any) {
    this.cookieService.set('user', res.user.userName, { expires: 10, sameSite: `Strict`, secure: true })
    this.cookieService.set('legalEntityId', '1', { expires: 10, sameSite: `Strict`, secure: true })
    this.cookieService.set('token', res.token, { expires: 10, sameSite: `Strict`, secure: true });
    this.cookieService.set('refreshToken', res.refresh_Token, { expires: 10, sameSite: `Strict`, secure: true });
  }
}
