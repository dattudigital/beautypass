import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BroadcastSmsService } from '../../services/broadcast-sms.service'
import { ToastMessageService } from '../../services/toast-message.service';

// such override allows to keep some initial values
declare var $: any;
export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}
@Component({
  templateUrl: 'broadcast-sms.component.html',
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
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig, }, ToastMessageService]
})
export class broadcastSmsComponent implements OnInit {

  broadcastIds: any;
  broadcastSelectedId: any = undefined;
  locationSelectedId: any = undefined;
  locationIds: any
  textToSend: any;
  constructor(private spinner: NgxSpinnerService, private messageService: ToastMessageService, private router: Router, sanitizer: DomSanitizer, private service: BroadcastSmsService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getBroadcastIds().subscribe(res => {
      this.spinner.hide();
      if (res["status"] == true) {
        this.broadcastIds = res["data"];
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

  selectedLocationId(val) {

  }

  sendBroadcastSms() {
    var data = {
      studioid: this.broadcastSelectedId,
      location: this.locationSelectedId,
      message: this.textToSend
    }
    this.spinner.show()
    this.service.broadcastSend(data).subscribe(res => {
      this.spinner.hide();
      this.messageService.successToast("SMS Sent Successfully")
    })
  }
}