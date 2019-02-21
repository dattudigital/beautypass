import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BroadcastSmsService } from '../../services/broadcast-sms.service'

@Component({
  selector: 'app-broadcast-notification',
  templateUrl: './broadcast-notification.component.html'
})
export class BroadcastNotificationComponent implements OnInit {
  broadcastIds: any;
  locationIds: any;
  title: any;
  broadcastSelectedId: any = undefined;
  locationSelectedId: any = undefined;
  textToSend: any;

  constructor(private spinner: NgxSpinnerService, private service: BroadcastSmsService) { }

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
    })
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

  sendNotification(){
    var data = {
      studio_id: this.broadcastSelectedId,
      locationid: this.locationSelectedId,
      title:this.title,
      desc: this.textToSend
    }
    this.service.broadcastNotification(data).subscribe(res => {});
  }


}