import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeHistoryService {

  constructor(private http: HttpClient) { }

  public getEmployeeHistory() {
    return this.http.get(environment.host + 'emp-history')
  }
}
