import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  
  public getGraphdata() {
    return this.http.get(environment.host + 'graphs');
  }
  public getallCountForDashboard() {
    return this.http.get(environment.host + 'web-dashboard');
  }

}
