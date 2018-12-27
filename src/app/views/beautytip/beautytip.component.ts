import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { BeautyTipsService } from '../../services/beauty-tips.service';
import { NgxSpinnerService } from 'ngx-spinner';

// such override allows to keep some initial values
declare var $: any;
export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}
@Component({
  templateUrl: 'beauty-tips.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class BeautyTipsComponent implements OnInit {
  alerts: any[] = [{
    type: 'success',
    msg: `Testmonial Details Updated Successfully`,
    timeout: 5000
  }];
  totalItems: number;
  categorysData: any;
  editData: any = [];
  bigCurrentPage: number = 1;
  currentImage: any = '';
  bankuploadedFiles: any;
  myFiles: string[] = [];
  bankstmtImage: number = 0;
  data = [];
  uploadedFiles: any[] = [];
  userImageName = '';
  userimagePreview: any;
  userImage: string;
  hideModal = false;
  deleteData: { tip_id: any; tip_title: any; tip_description: any; profile_name: any; rec_status: number; };
  alertMessageValue: boolean;
  validBtn: boolean;
  userData: any;
  constructor(private spinner: NgxSpinnerService, private router: Router, private service: BeautyTipsService, sanitizer: DomSanitizer) {
    this.alertsHtml = this.alertsHtml.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }
  ngOnInit() {
    this.spinner.show();
    this.service.getBeautyTipsList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData);
      this.spinner.hide();
    });
    this.userData=JSON.parse(localStorage.getItem('loginDetails'));
    console.log(this.userData[0].employee_id);

  }
  model: any = {};

  onSubmit() {
    console.log(this.editData.tip_title);
    this.updatePromotion(this.editData);
  }
  getList() {
  
  }
  alertsHtml: any = [
    {
      type: 'success',
      msg: `<strong>Well done!</strong> You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `<strong>Heads up!</strong> This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `<strong>Warning!</strong> Better check yourself, you're not looking too good.`
    }
  ];
  clearData() {
    this.editData = [];
    this.userimagePreview = '';
    this.userImageName = '';
    this.userImage = '';
  }
  editPromotion(data, index) {
    data.index = index;
    this.editData = data;
    console.log(this.editData)
  }
  updatePromotion(val) {
    let element = document.getElementById("CloseButton");
    console.log(val)
    var data = {
      tip_id: val.tip_id,
      tip_title: val.tip_title,
      tip_description: val.tip_description,
      tip_img: this.userImage,
      tip_category: 1,
      profile_name: this.userImageName,
      rec_status: val.rec_status
    }
     if(!data.tip_id){
       this.addCreate();
     }
    this.service.editBeautyTip(data).subscribe();

    element.click();
    this.categorysData = [];
    this.service.getBeautyTipsList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData);
      //this.addCreate();
    });
  }
  DeletePromotion(val) {
    console.log(val)
    var data = {
      tip_id: val.tip_id,
      tip_title: val.tip_title,
      tip_description: val.tip_description,
      profile_name: val.profile_name,
      rec_status: 0
    }
    this.deleteData = data;
  }
  deleteAlert() {
    this.service.editBeautyTip(this.deleteData).subscribe();
    this.delete();
    this.categorysData = [];
    this.service.getBeautyTipsList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData)
    });

  }
  alertsDismiss: any = [];
  add(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `Updated Sucessfully!`,
      timeout: 5000
    });
  }
  addCreate(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `Created Sucessfully!`,
      timeout: 5000
    });
  }
  delete(): void {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `Deleted Sucessfully!`,
      timeout: 5000
    });
  }
  getFileDetails(event, text1) {
    this.currentImage = text1;
    console.log(this.currentImage);
    var files = event.target.files;
    var file = files[0];

    for (var i = 0; i < files.length; i++) {
      this.uploadedFiles = files.name;
      console.log(this.uploadedFiles);
    }

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

    if (event.target.files && event.target.files[0] && this.currentImage === 'p') {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.userImageName = file.name;
      console.log(this.userImageName);
      reader.onload = (event) => {
        this.userimagePreview = event.target;
      }
    }


  }
  //image base64 format
  _handleReaderLoaded(readerEvt) {


    if (this.currentImage === 'p') {
      var binaryString = readerEvt.target.result;
      this.userImage = btoa(binaryString);
      console.log("final" + this.userImage)
    }

    this.currentImage = ''
  }
  requiredValue(){
    if(this.editData.tip_title==""){
      this.alertMessageValue=true;
      this.validBtn=true
    }
    else{
      this.alertMessageValue=false;
      this.validBtn=false;
    }
  }
}
