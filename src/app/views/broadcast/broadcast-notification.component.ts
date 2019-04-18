import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BroadcastSmsService } from '../../services/broadcast-sms.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastMessageService } from '../../services/toast-message.service';

@Component({
  selector: 'app-broadcast-notification',
  templateUrl: './broadcast-notification.component.html',
  providers: [ToastMessageService]

})
export class BroadcastNotificationComponent implements OnInit {
  broadcastIds: any;
  locationIds: any;
  title: any;
  broadcastSelectedId: any = undefined;
  locationSelectedId: any = undefined;
  textToSend: any;
  notificationForm: FormGroup;
  submitted = false;

  constructor(private spinner: NgxSpinnerService, private messageService: ToastMessageService, private formBuilder: FormBuilder, private service: BroadcastSmsService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getBroadcastIds().subscribe(res => {
      this.spinner.hide();
      if (res["status"] == true) {
        this.broadcastIds = res["data"];
        console.log(this.broadcastIds)
      } else {
        this.broadcastIds = [];
      }
    });

    this.notificationForm = this.formBuilder.group({
      pushStudio: ['', Validators.required],
      pushTitle: ['', Validators.required],
      pushText: ['', Validators.required]

    });
  }

  selectedBroadcastId(val) {
    this.spinner.show();
    this.service.locationsId(val).subscribe(res => {
      this.spinner.hide();
      if (res["status"] == true) {
        this.locationIds = res["data"];
      } else {
        this.locationIds = [];
      }
    })
  }

  get f() { return this.notificationForm.controls; }

  sendNotification() {
    this.submitted = true;
    if (this.notificationForm.invalid) {
      return;
    }
    var data = {
      studio_id: this.broadcastSelectedId,
      locationid: this.locationSelectedId,
      title: this.title,
      desc: this.textToSend
    }
    this.spinner.show();
    this.service.broadcastNotification(data).subscribe(res => {
      this.spinner.hide();
      this.messageService.successToast("Notification Sent Successfully")
    });
  }


}