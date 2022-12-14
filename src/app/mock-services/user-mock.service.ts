import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountServiceInterface } from '../api-services/account.service';
import { AccountAPI } from '../apis/account.api';
import {
  UserLoginForm,
  LoginResponse,
  UserCreateForm,
  UserForm,
  UserOTPPassword,
  UserResetPassword,
  UserUpdateForm,
  UserUpdatePasswordForm,
} from '../common/account.model';
import { AppResponse } from '../common/app.model';
import { TokenService } from '../services/token.service';



@Injectable()
export class UserMockService implements AccountServiceInterface{
  constructor(
    private tokenService:TokenService,
    private router:Router
  ) {
    console.log('using service from mock user');
  }
  create(data: UserCreateForm): Observable<AppResponse> {
    throw new Error('New user has been created');
  }
  update(data: UserUpdateForm): Observable<AppResponse> {
    return of({message:'User information has been updated'});

  }
  updatePassword(data: UserUpdatePasswordForm): Observable<AppResponse> {
    return of({message:'password has been updated'});

  }
  OTPForgetPassword(data: UserOTPPassword): Observable<AppResponse> {
    return of({message:'OTP code has been sent'});

  }
  resetPassword(data: UserResetPassword): Observable<AppResponse> {
    return of({message:'password has been reset'});
  }
  read(data: UserForm): Observable<AppResponse> {
    return of({message:"read data"});
  }
  public logout(): void {
    this.tokenService.clearLocalStorage();
    this.router.navigateByUrl("/",{replaceUrl:true})
  }
  public login(data: UserLoginForm): Observable<LoginResponse> {
    console.log('form login mock user');

    const t: LoginResponse = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJkZW1vQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJkZW1vIGFjY291bnQiLCJuYmYiOjE3NjI3MTgxNjA5NzUsImV4cCI6MTc2MjcxODE3MDk3NX0.76NsxxsHsGdmt4_rRlAcVLOOPLHXR8kBZLQ4TQ8u6Dw',
      message: 'SUCEESS LOGIN',
    };
    return of(t);
  }
}
