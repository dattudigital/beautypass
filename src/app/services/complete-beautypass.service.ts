import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompleteBeautypassService {
  userData: any = [];
  couponsData: any = [];
  employeeDetails: any = [];
  faqData: any = [];
  tipsData: any = [];
  testmonials: any = [];
  videoTestimonials:any=[];

  constructor() { }

  public addUser(user) {
    this.userData = user;
  }

  public getUser() {
    return this.userData;
  }

  public addCoupons(coupon) {
    this.couponsData = coupon
  }

  public getCoupons() {
    return this.couponsData;
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

}
