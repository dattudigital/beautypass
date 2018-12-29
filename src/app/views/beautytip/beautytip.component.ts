import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeautyTipsService } from '../../services/beauty-tips.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData } from 'ng2-toasty';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'beautytip.component.html',
  styles: [],
})

export class BeautyTipsComponent implements OnInit {

  toastOptionsSuccess: ToastOptions = {
    title: "Success",
    msg: "Successfully Done",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  toastOptionsError: ToastOptions = {
    title: "Error",
    msg: "Something is Wrong",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };

  beautyTips: any;
  cols: any[];
  beautyTipData: any = {
    'tip_id': '',
    'tip_title': '',
    'tip_description': '',
    'tip_img': '',
    'profile_name': '',
    'rec_status': ''
  }

  totalItems: number;
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
  validBtn: boolean;
  userData: any;

  constructor(private spinner: NgxSpinnerService, private router: Router, private service: BeautyTipsService) {}
  
  ngOnInit() {
    this.spinner.show();
    this.service.getBeautyTipsList().subscribe(response => {
      this.beautyTips = response.json().data;
      console.log(this.beautyTips);
      this.spinner.hide();
    });
    this.userData=JSON.parse(localStorage.getItem('loginDetails'));
    console.log(this.userData[0].employee_id);

    this.cols = [
      { field: 'tip_title', header: 'Tip Title' },
      { field: 'tip_description', header: 'Description' },
      { field: 'tip_img', header: 'Image' },
      { field: 'tip_video', header: 'Video' }
    ];
  }
  
  // model: any = {};

  // onSubmit() {
  //   console.log(this.editData.tip_title);
  //   this.updatePromotion(this.editData);
  // }
  clearData() {
    this.editData = [];
    this.userimagePreview = '';
    this.userImageName = '';
    this.userImage = '';
  }

  addOrUpdateBeautyTips() {
    if (!this.beautyTipData.rec_status) {
      this.beautyTipData.rec_status = '1'
    } else {
      this.beautyTipData.rec_status = '0'
    }
    console.log(this.beautyTipData.tip_id)
    if (!this.beautyTipData.tip_id) {
      console.log('@@@@@@@@')
      this.beautyTipData.tip_id = null;
    }
    console.log(this.beautyTipData.tip_id)
    var data = {
      tip_id: this.beautyTipData.tip_id,
      tip_title: this.beautyTipData.tip_title,
      tip_description: this.beautyTipData.tip_description,
      tip_img: this.beautyTipData.tip_img,
      tip_category: 1,
      profile_name: this.beautyTipData.profile_name,
      rec_status: this.beautyTipData.rec_status
    }
    console.log(data);
    this.service.AddOrEditBeautyTip(data).subscribe(res => {
      console.log(res.json())
    })
  }

  // editBeautyTips(data, index) {
  //   data.index = index;
  //   this.editData = data;
  //   console.log(this.editData)
  // }

  editBeautyTip(data, index) {
    this.beautyTipData = data;
    console.log(this.beautyTipData.tip_img)
    this.userimagePreview = this.beautyTipData.tip_img
  }

  removeFields() {
    this.beautyTipData.tip_id = '';
    this.beautyTipData.tip_title = '';
    this.beautyTipData.tip_description = '';
    this.beautyTipData.tip_img = ''
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
     }
    this.service.editBeautyTip(data).subscribe();

    element.click();
    this.beautyTips = [];
    this.service.getBeautyTipsList().subscribe(response => {
      this.beautyTips = response.json().data;
      console.log(this.beautyTips);
      //this.addCreate();
    });
  }

  deleteBeautyTips(val) {
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
    this.beautyTips = [];
    this.service.getBeautyTipsList().subscribe(response => {
      this.beautyTips = response.json().data;
      console.log(this.beautyTips)
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

  // requiredValue(){
  //   if(this.editData.tip_title==""){
  //     this.alertMessageValue=true;
  //     this.validBtn=true
  //   }
  //   else{
  //     this.alertMessageValue=false;
  //     this.validBtn=false;
  //   }
  // }

}
