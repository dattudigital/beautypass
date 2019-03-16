import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private http: HttpClient) { }

  public getPackages(id: any) {
    // return this.http.get(environment.host + 'mindbody-packages');
    return this.http.get('http://localhost:3001/mindbody-packages/' + id)
  }

  public addPackage(data: any) {
    // return this.http.post(environment.host + 'mindbody-packages', data);
    return this.http.post('http://localhost:3001/mindbody-packages', data)

  }

  public deletePackages(id: any) {
    return this.http.delete('http://localhost:3001/mindbody-packages/' + id)
  }

  public getSites() {
    return this.http.get('http://localhost:3001/siteids')
  }
}
