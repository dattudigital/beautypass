import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        localStorage.removeItem('faq');
        localStorage.removeItem('employee');
        localStorage.removeItem('activityData');
        localStorage.removeItem('perksData');
        localStorage.removeItem('beautytip');
        localStorage.removeItem('packages');
        if (localStorage.getItem('loginDetails')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}