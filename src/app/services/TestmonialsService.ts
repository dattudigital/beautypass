import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TestmonialsService {
  constructor(private http: HttpClient) { }
  public editWrittenTestmonials(data: any) {
    return this.http.post(environment.host + 'written-testimonials', data);
  }
  public getWrittenTestmonials(url:any) {
    return this.http.get(environment.host + 'written-testimonials'+url);
  }
  public editVideoTestmonials(data: any) {
    return this.http.post(environment.host + 'video-testimonials', data);
  }
  public getVideoTestmonials() {
    return this.http.get(environment.host + 'video-testimonials');
  }
}