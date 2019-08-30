import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Token': `${this.getToken()}`,
       },
    });
    return next.handle(req);
  }

  getToken() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')).accessToken;
    }
    return '';
  }
}
