import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BroadcastSmsService } from '../../services/broadcast-sms.service'

// such override allows to keep some initial values
declare var $: any;
export function getAlertConfig(): AlertConfig {
    return Object.assign(new AlertConfig(), { type: 'success' });
}
@Component({
    templateUrl: 'broadcast-package-sms.component.html',
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
export class broadcastPackageSmsComponent implements OnInit {
    broadcastIds: any;
    broadcastSelectedId: any = undefined;
    locationSelectedId: any = undefined;
    locationIds: any
    textToSend: any;

    constructor(private spinner: NgxSpinnerService, private router: Router, sanitizer: DomSanitizer, private service: BroadcastSmsService) {
    }

    ngOnInit() {
        this.init();
    }

    init() {
        this.spinner.show();
        this.service.getBroadcastIdFromMembership().subscribe(res => {
            this.spinner.hide();
            if (res.json().status == true) {
                this.broadcastIds = res.json().data;
            } else {
                this.broadcastIds = [];
            }
        })
    }

    sendBroadcastSmsToMembership() {
        var data = {
            studioid: this.broadcastSelectedId,
            message: this.textToSend
        }
        this.service.sendBroadcastIdForMembership(data).subscribe(res => {

        })
    }
}