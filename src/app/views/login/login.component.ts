import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  errorMeassage=false;
  editData={
  'emailid': '',
  'password':''
  }
  categorysData: any;
  constructor(private spinner: NgxSpinnerService,private router: Router,private service: LoginService) { }
  toDashBoard(){
    this.router.navigate(['dashboard'])
  }
  onSubmit() {
    this.spinner.show();
    console.log(this.editData);
    if(this.editData.emailid!='' && this.editData.password!=''){
      this.service.loginSubmit(this.editData).subscribe(response => {
        this.categorysData = response.json();
        // console.log(this.categorysData.data[0]);
        this.spinner.hide();
        if(this.categorysData.status==true){
          localStorage.setItem('loginDetails', JSON.stringify(this.categorysData.data));
          this.router.navigate(['dashboard']);
        } else{
         this.errorMeassage=true;
       }
      }, err => {
        this.spinner.hide();
      })
      ;
    }
   
   // this.updatePromotion(this.editData);
  }
}
