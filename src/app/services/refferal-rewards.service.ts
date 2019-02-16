import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RefferalRewardsService {

  constructor(private http: HttpClient) { }
  public getUserActivitiesList() {
    return this.http.get(environment.host + 'reffer-activities');
  }
  public _addOrEditRefferalActivities(data: any) {
    return this.http.post(environment.host + 'reffer-activities', data);
  }

  public deleteRefferalActivities(id: any) {
    return this.http.delete(environment.host + 'reffer-activities/' + id);
  }

  public getPerksList() {
    return this.http.get(environment.host + 'reward-points');
  }
  public addOrEditPerksList(data: any) {
    return this.http.post(environment.host + 'reward-points', data);
  }

  public deletePerksList(id: any) {
    return this.http.delete(environment.host + 'reward-points/' + id);

  }
  public getMindBodyCoupons() {
    return this.http.get(environment.host + 'mindbody-coupons');
  }
  public addoreditMindBodyCoupons(data: any) {
    return this.http.post(environment.host + 'mindbody-coupons', data);
  }

  public deleteMindBodyCoupons(id: any) {
    return this.http.delete(environment.host + 'mindbody-coupons/' + id);
  }

  public addBulkMindBodyCoupons(data: any) {
    return this.http.post(environment.host + 'bulk-upload', data);

  }
  public getUserlistForHistory(data: any) {
    return this.http.get(environment.host + 'user-search?name=' + data);
  }
  public getUserRewardHistory(id: number) {
    return this.http.get(environment.host + 'reward_histories/' + id);
  }

  public addUserPoints(data: any) {
    return this.http.post(environment.host + 'user-points', data)
  }

  public getUserHistory(URL: any) {
    return this.http.get(environment.host + 'reward_histories' + URL)
  }
}
