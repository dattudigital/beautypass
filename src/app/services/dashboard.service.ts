import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: Http) { }
  public getMaleCount() {
    return this.http.get(environment.host + 'get_male_users_count');
  }
  public getFemaleCount() {
    return this.http.get(environment.host + 'get_female_users_count');
  }
  public getBeautyTipsList() {
    return this.http.get(environment.host + 'show-beauty-tips');
  }
  public getUserActivitiesList() {
    return this.http.get(environment.host + 'reffer-activities');
  }
  public getPerksList() {
    return this.http.get(environment.host + 'reward-points');
  }
  public getMindBodyCoupons() {
    return this.http.get(environment.host + 'mindbody-coupons');
  }
  public getUserlistForHistory() {
    return this.http.get(environment.host + 'get_users_list');
  }
  public getUserRewardHistory(id: number) {
    return this.http.get(environment.host + 'reward_histories/' + id);
  }
  public editWrittenTestmonials(data: any) {
    return this.http.post(environment.host + 'written-testimonials', data);
  }
  public getWrittenTestmonials() {
    return this.http.get(environment.host + 'written-testimonials');
  }
  public editVideoTestmonials(data: any) {
    return this.http.post(environment.host + 'video-testimonials', data);
  }
  public getVideoTestmonials() {
    return this.http.get(environment.host + 'video-testimonials');
  }
  public getUsersList() {
    return this.http.get(environment.host + 'total-users');
  }
  public getRecentUsersList() {
    return this.http.get(environment.host + 'get_recent_users');
  }
  public getGraphdata() {
    return this.http.get(environment.host + 'graphs');
  }
  public getallCountForDashboard() {
    return this.http.get(environment.host + 'web-dashboard');
  }

}
