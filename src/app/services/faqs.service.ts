import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

 
  constructor(private http: HttpClient) { }
  public addOrUpdateFaq(data:any) {
    return this.http.post(environment.host + 'faqs', data);
  }
  public getList() {
    return this.http.get(environment.host + 'faqs');
  }

  public deleteFaq(id:any){
    return this.http.delete(environment.host + 'faqs/' + id);

  }
}
