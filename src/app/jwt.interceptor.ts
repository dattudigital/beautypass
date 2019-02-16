import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log(request);
        let currentUser = {token:'*********'};
        if (currentUser) {
            if (currentUser.token) {
                console.log(currentUser.token)
                request = request.clone({
                    setHeaders: {
                        'x-access-token': currentUser.token
                    }
                });
            }
        }
        return next.handle(request);
    }

}