import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompleteBeautypassService {
  userData: any = [];
  employeeDetails: any = [];
  faqData: any = [];
  tipsData: any = [];
  testmonials: any = [];
  videoTestimonials: any = [];
  userActivitiesData: any = [];
  perk: any = [];

  constructor() { }

  public addUser(user) {
    this.userData = user;
  }

  public getUser() {
    return this.userData;
  }

  public addEmployees(employee) {
    this.employeeDetails = employee;
  }

  public getEmployees() {
    return this.employeeDetails;
  }

  public addFaqs(faq) {
    this.faqData = faq;
  }

  public getFaqs() {
    return this.faqData;
  }

  public addBeautyTip(tip) {
    this.tipsData = tip;
  }

  public getBeautyTip() {
    return this.tipsData;
  }

  public addWrittenTestmonials(written) {
    this.testmonials = written;
  }

  public getWrittenTestmonials() {
    return this.testmonials;
  }

  public addVideoTestmonials(video) {
    this.videoTestimonials = video;
  }

  public getVideoTestmonials() {
    return this.videoTestimonials;
  }

  public addUserActivity(user) {
    this.userActivitiesData = user
  }

  public getUserActivity() {
    return this.userActivitiesData;
  }

  public addPerksData(perk) {
    this.perk = perk
  }

  public getPerksData(){
    return this.perk;
  }
}
