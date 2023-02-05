import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: any) => {
        if (event instanceof HttpResponse) {
          console.log("http interceptor", event)
          localStorage.setItem('token', event.body.token);
          //event = event.clone({ body: resolveReferences(event.body) })
        }
        return event;
      })
    );
    return next.handle(request);
  }
}
