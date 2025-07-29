import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../../services/login/login.service';

export const JwtAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const loggingService = inject(LoginService);
  // Handle request
  request = addAuthHeader(loggingService, request);
  return next(request).pipe(catchError(error => {
    console.log('');
    return throwError(() => new Error('Service Unavailable'));
  }));;
}

export const addAuthHeader = (loggingService: LoginService, request?: HttpRequest<any>, newToken?: string) => {

  let token: string = '';
  if (newToken) {
    token = newToken;
  } else {
    token = loggingService?.getCookieValue('token');
  }

  if (token) {
    request = request!.clone({ headers: request!.headers.set('Authorization', 'Bearer ' + token) });
  }

  if (!request?.url.includes('/upload') && !request!.headers.has('Content-Type')) {
    request = request!.clone({ headers: request!.headers.set('Content-Type', 'application/json; charset=utf-8') });
  }

  request = request!.clone({ headers: request!.headers.set('Accept', 'application/json') });
  return request;
}

export const handleResponseError = (error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandlerFn, loggingService: LoginService) => {
  let errorMsg = '';
  // Business error
  if (error.status === 400) {
    errorMsg = ErrorMessage(error);
  }
  // Invalid token error
  else if (error.status === 401) {
    logout(loggingService);
    errorMsg = ErrorMessage(error);
    return throwError(() => new Error('User Unauthorized'));
    // this.handle401Error(request, next);
  }
  else if (error.status === 0) {
    logout(loggingService);
    return throwError(() => new Error('Service Unavailable'));
  }
  // Access denied error
  else if (error.status === 403) {
    errorMsg = ErrorMessage(error);
    logout(loggingService);
  }
  // Server error
  else if (error.status === 500) {
    errorMsg = ErrorMessage(error);
  }
  // Maintenance error
  else if (error.status === 503) {
    // Show message
    // Redirect to the maintenance page
    errorMsg = ErrorMessage(error);
  }
  return throwError(() => errorMsg);
}

export const logout = (loggingService: LoginService) => {
  loggingService.LogOut();
}

export const ErrorMessage = (requestError: HttpErrorResponse): string => {
  let errorMsg = '';
  if (requestError.error instanceof ErrorEvent) {
    errorMsg = `Error: ${requestError.error.message}`;
  } else {
    errorMsg = `Error Code: ${requestError.status}, Message: ${requestError.message}`;
  }
  console.error(errorMsg);
  return errorMsg;
}