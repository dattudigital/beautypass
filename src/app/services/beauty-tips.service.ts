import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeautyTipsService {

  constructor(private http: HttpClient) { }
  public getBeautyTipsList() {
    return this.http.get(environment.host + 'beauty-tips');
  }
  public AddOrEditBeautyTip(data: any) {
    return this.http.post(environment.host + 'beauty-tips', data);
  }
  public DeleteBeautyTip(id: any) {
    return this.http.delete(environment.host + 'beauty-tips/'+id);
  }
}
