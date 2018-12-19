import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http) { }
  public loginSubmit(data:any) {
    return this.http.post(environment.host + 'web-login', data);
  }
  public rgisterSubmit(data:any) {
    return this.http.post(environment.host + 'add_employee', data);
  }
  public getEmpList() {
    return this.http.get(environment.host + 'get_employees');
  }
}
