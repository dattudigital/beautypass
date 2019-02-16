import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private http: HttpClient) { }
  public getUsersList() {
    return this.http.get(environment.host + 'get_users_list');
  }
  public getMaleCount() {
    return this.http.get(environment.host + 'get_male_users_count');
  }
  public getFemaleCount() {
    return this.http.get(environment.host + 'get_female_users_count');
  }
  public getStudioId() {
    return this.http.get(environment.host + 'studioids');
  }

  public getLocationId(url: any) {
    return this.http.get(environment.host + 'locationids/' + url)
  }

  public getUsers(url: any) {
    return this.http.get(environment.host + 'users-limit' + url)
  }

}
