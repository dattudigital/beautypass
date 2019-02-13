import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http) { }
  public loginSubmit(data: any) {
    return this.http.post(environment.host + 'web-login', data);
  }
  public addOrUpdateEmployee(data: any) {
    return this.http.post(environment.host + 'employees', data);
  }
  public getEmpList() {
    return this.http.get(environment.host + 'employees');
  }

  public deleteEmployee(id: any) {
    return this.http.delete(environment.host + 'employees/' + id);
  }
}
