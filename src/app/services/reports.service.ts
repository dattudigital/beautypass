import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }
  
  public getVoucherReports(url:any) {
    return this.http.get(environment.host + 'reports/vocher'+url);
  }

  public getPerksReports(url:any) {
    return this.http.get(environment.host + 'reports/perks'+url);
  }
}
