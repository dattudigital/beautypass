import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BroadcastSmsService } from '../../services/broadcast-sms.service'

@Component({
  selector: 'app-broadcast-notification',
  templateUrl: './broadcast-notification.component.html'
})
export class BroadcastNotificationComponent implements OnInit {
  broadcastIds: any;


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

}