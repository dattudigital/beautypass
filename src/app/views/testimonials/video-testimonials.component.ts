import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestmonialsService } from "../../services/TestmonialsService";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: 'video-testimonials.component.html'
})

export class VideoTestimonialsComponent {
  categorysData: any;
  editData: any = []
  deleteData: { testimonial_id: any; description: any; video: any; user_id: any; likes: any; video_thumbnail: any; rec_status: number; };
  userData: any;
  constructor(private spinner: NgxSpinnerService,private router: Router,private service: TestmonialsService) { }
  backToDashBoard() {
    this.router.navigate(['reports'])
  }
  ngOnInit() {
    this.spinner.show();
  this.service.getVideoTestmonials().subscribe(response => {
    this.categorysData = response.json().data;
    console.log(this.categorysData);
    this.userData=JSON.parse(localStorage.getItem('loginDetails'));
    console.log(this.userData[0].employee_id);
    this.spinner.hide();
  });
}
editPromotion(data, index) {
  data.index = index;
  this.editData = data;
  console.log(this.editData)
}
openNewWindow(data, index){
  data.index = index;
  this.editData = data;
  console.log(this.editData)
  var newWindow = window.open(this.editData.video);
}
onSubmit() {
  //console.log(this.editData.tip_title);
  this.updatePromotion(this.editData);
}
updatePromotion(val) {
  let element = document.getElementById("CloseButton");
  console.log(val)
  var data = {
    description: val.description,
    video: val.video,
    user_id: val.user_id,
    likes: val.likes,
    testimonial_id: val.testimonial_id,
    video_thumbnail: val.video_thumbnail,
    updatedempid:this.userData[0].employee_id
  }
  console.log(data);
  this.service.editVideoTestmonials(data).subscribe();
  this.add();
  element.click();
}
DeletePromotion(val) {
  console.log(val)
  var data = {
    testimonial_id: val.testimonial_id,
    description: val.description,
    video: val.video,
    user_id: val.user_id,
    likes: val.likes,
    video_thumbnail: val.video_thumbnail,
    rec_status: 0
  }
 
  this.deleteData=data;
}
deleteAlert(){
  this.service.editVideoTestmonials(this.deleteData).subscribe();
  this.delete();
  this.categorysData=[];
  this.service.getVideoTestmonials().subscribe(response => {
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
delete(): void {
  this.alertsDismiss.push({
    type: 'danger',
    msg: `Deleted Sucessfully!`,
    timeout: 5000
  });
}
}