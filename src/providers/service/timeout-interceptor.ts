import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';


@Injectable()
export class TimeoutInterceptorProvider implements HttpInterceptor {
  defaultTimeout = 30000;
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = Number(req.headers.get('timeout')) || this.defaultTimeout;
    return next.handle(req).pipe(timeout(timeoutValue));
  }
}