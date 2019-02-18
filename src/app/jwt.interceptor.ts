import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // console.log(request);
        // let currentUser = {token:'*********'};
        let currentUser = JSON.parse(localStorage.getItem('loginDetails'));
<<<<<<< HEAD
        // console.log(currentUser)
=======
        console.log(currentUser)
        console.log(currentUser.data[0].emp_email)
        console.log(currentUser.data[0].emp_password)
>>>>>>> 508a6229938bfc21922477648a6e28cf455a1549
        if (currentUser) {
            if (currentUser.token) {
                // console.log(currentUser.token)
                request = request.clone({
                    setHeaders: {
                        'x-access-token': currentUser.token,
                        'username': "sh_br_ba",
                        'password': "sh@sh.com"

                    }
                });
            }
        }
        return next.handle(request);
    }

}