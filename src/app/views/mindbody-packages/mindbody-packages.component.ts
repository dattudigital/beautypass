import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
import { ToastMessageService } from '../../services/toast-message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackagesService } from '../../services/packages.service';
import { Http } from '@angular/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-mindbody-packages',
  templateUrl: './mindbody-packages.component.html',
  providers: [ToastMessageService]

})
export class MindbodyPackagesComponent implements OnInit {
  packageData: any;
  cols: any = [];
  packagesForm: FormGroup;
  siteData: any = [];

  packagesDetails = {
    'mb_pack_id': '',
    'mb_pack_name': '',
    'mb_pack_price': '',
    'mb_pack_desc': '',
    'mb_pack_online_price': '',
    'mb_program_id': '',
    'mb_pack_tax': '',
    'mb_product_id': '',
    'mb_pack_mb_id': '',
    'mb_pack_count': '',
    'mb_pack_validity': '',
    'mb_series_id': '',
    'studio_id': '',
    'studio_name': '',
    'rec_status': ''
  }
  siteId: '';
  submitted = false;
  copiedRow: any;
  deleteRecord: any;
  searchid: '';

  constructor(private spinner: NgxSpinnerService, private http: Http, private service: PackagesService, private formBuilder: FormBuilder, private loginservice: LoginService, private router: Router, private messageService: ToastMessageService, ) { }

  ngOnInit() {
    this.getPackages();
    this.service.getSites().subscribe(res => {
      if (res["status"] == true) {
        this.siteData = res["data"]
      } else {
        this.siteData = '';
      }
    })

    this.packagesForm = this.formBuilder.group({
      packageName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      onlinePrice: ['', Validators.required],
      validity: ['', Validators.required],
      seriesId: ['', Validators.required],
      site: ['', Validators.required]
    });

    this.cols = [
      { field: 'mb_pack_name', header: 'Name' },
      { field: 'mb_pack_desc', header: 'Description' },
      { field: 'mb_pack_price', header: 'Price' },
      { field: 'mb_pack_online_price', header: 'Online Price' },
      { field: 'mb_pack_validity', header: 'Validity' },
      { field: 'mb_product_id', header: 'Product Id' },
      { field: 'mb_pack_mb_id', header: 'Package Id' },
      { field: 'studio_id', header: 'Studio Id' },
      { field: 'rec_status', header: 'Status', type: 1 }
    ];

  }

  getPackages() {
    this.searchid = ''
    this.spinner.show();
    this.service.getPackages(this.searchid).subscribe(res => {
      this.spinner.hide();
      if (res["status"] == true) {
        this.packageData = res["data"];
      } else {
        this.packageData = [];
      }
    });
  }

  reloadClick() {
    this.getPackages()
  }

  get f() { return this.packagesForm.controls; }

  addOrUpdatePackage() {
    this.submitted = true;

    if (this.packagesForm.invalid) {
      return;
    }
    if (!this.packagesDetails.mb_pack_id) {
      this.packagesDetails.rec_status = '1'
    }
    if (!this.packagesDetails.mb_pack_id) {
      this.packagesDetails.mb_pack_id = null;
    }
    var data = {
      mb_pack_id: this.packagesDetails.mb_pack_id,
      mb_pack_name: this.packagesDetails.mb_pack_name,
      mb_pack_price: this.packagesDetails.mb_pack_price,
      mb_pack_desc: this.packagesDetails.mb_pack_desc,
      mb_pack_online_price: this.packagesDetails.mb_pack_online_price,
      mb_program_id: this.packagesDetails.mb_program_id,
      mb_pack_tax: this.packagesDetails.mb_pack_tax,
      mb_product_id: this.packagesDetails.mb_product_id,
      mb_pack_mb_id: this.packagesDetails.mb_pack_mb_id,
      mb_pack_count: this.packagesDetails.mb_pack_count,
      studio_id: this.packagesDetails.studio_id,
      mb_series_id: this.packagesDetails.mb_series_id,
      // studio_name: this.packagesDetails.studio_id["studio_name"],
      mb_pack_validity: this.packagesDetails.mb_pack_validity,
      rec_status: this.packagesDetails.rec_status,
    }
    console.log(data)

    let modelClose = document.getElementById("ClosePackage");
    this.spinner.show()
    this.service.addPackage(data).subscribe(res => {
      console.log(res)
      this.spinner.hide()
      modelClose.click();
      if (res["status"] == true) {
        if (!this.packagesDetails.mb_pack_id) {
          if (JSON.parse(localStorage.getItem('packages'))) {
            this.packageData = JSON.parse(localStorage.getItem('packages'))
          }
          this.packageData.push(res["data"]);
          this.packageData = this.packageData.slice();
          this.messageService.successToast("package Added Successfully")
        } else {
          if (this.packagesDetails.rec_status == '0') {
            this.packageData[this.packagesDetails["index"]].rec_status = "0";
            this.packageData[this.packagesDetails["index"]] = res["data"];
            this.packageData = this.packageData.slice();
            localStorage.setItem('packages', JSON.stringify(this.packageData))
            this.messageService.successToast("package Inactive Successfully")
          } else {
            this.packageData[this.packagesDetails["index"]] = res["data"];
            this.messageService.successToast("package Updated Successfully")
          }
        }
      } else {
        this.messageService.errorToast("package is not added")
      }
    });
  }

  editPackage(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.packagesDetails = data;
    this.packagesDetails["index"] = index;
  }
  backupData() {
    let _index = this.packagesDetails["index"];
    this.packageData[_index] = this.copiedRow;
  }

  DeletePackage(data, index) {
    this.deleteRecord = data;
    this.deleteRecord["index"] = index;
  }

  removeFields() {
    this.submitted = false;
    this.packagesDetails.mb_pack_name = '';
    this.packagesDetails.mb_pack_desc = '';
    this.packagesDetails.studio_id = undefined;
    this.packagesDetails.mb_pack_price = '';
    this.packagesDetails.mb_pack_online_price = '';
    this.packagesDetails.mb_series_id = '';
    this.packagesDetails.mb_product_id = '';
    this.packagesDetails.mb_program_id = '';
    this.packagesDetails.mb_pack_mb_id = '';
    this.packagesDetails.mb_pack_tax = '';
    this.packagesDetails.mb_pack_count = '';
    this.packagesDetails.mb_pack_validity = '';
    this.packagesDetails.rec_status = '';
  }

  deleteAlert() {
    this.spinner.show()
    this.service.deletePackages(this.deleteRecord["mb_pack_id"]).subscribe(res => {
      this.spinner.hide()
      if (res["status"] == true) {
        this.packageData.splice(this.deleteRecord["index"], 1);
        localStorage.setItem('packages', JSON.stringify(this.packageData))
        this.messageService.successToast("packages Deleted Successfully")
      } else {
        this.messageService.errorToast("packages is not Deleted")
      }
    });
  }

  getSearchReports() {
    console.log(this.siteId);
    this.spinner.show();
    this.service.getPackages(this.siteId).subscribe(res => {
      this.spinner.hide();
      if (res["status"] == true) {
        this.packageData = res["data"];
      } else {
        this.packageData = [];
      }
    })
  }

  detailsReset() {
    this.siteId = undefined;
    this.getPackages()
  }
  only_allow_number(event) {
    var k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return (k == 8 || k == 32 || (k >= 48 && k <= 57) || k == 0 || k == 36);
  }

}
