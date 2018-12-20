import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  userData: any;
  tipsData: any;
  activitiesData: any;
  videoData: any;
  writtenData: any;
  mindBodyData: any;
  recentUserData: any;
  perksData: any;
  userDataLength: any;
  videoDatalength: number;
  activitiesDataLength: number;
  writtenDataLength: number;
  tipsDataLength: number;
  mindBodyDatalength: number;
  perksDataLength: number;
  actvitiesDataLength: number;
  maleUserCount: number;
  femaleUserCount: number;
  totalUsers: number;
  categorysData: any;
  test: any;
  num1: number;
  num2: number;
  garphData: any;
  mainChartData1: Array<number> = [];;
  mainChartData1Test: Array<number> = [];
  constructor(private spinner: NgxSpinnerService, private service: DashboardService) {
  }
  ngOnInit() {
    this.service.getGraphdata().subscribe(response => {
      this.garphData = response.json().data;
      this.mainChartData1Test = this.transformJsonToCustomFormat(response.json().data);
      this.mainChartLabels = this.transformJsonToCustomFormat1(response.json().data);
      //this.mainChartData1.push(this.mainChartData1Test);
      console.log("test12345" + this.mainChartData1Test);
      console.log("test1234" + this.mainChartData1);
      console.log("test123" + this.mainChartLabels);
      //this.spinner.hide();
      // console.log(this.userData.length);
    });
    // generate random values for mainChart
  
    //console.log("test123"+this.mainChartData1);
    //console.log("test123"+this.mainChartLabels);
   // this.mainChartData1=this.mainChartData1Test;
   //console.log("test123" +this.mainChartData1);
    
    console.log(this.mainChartData1);
     this.mainChartData1.push(1,1,2,2,1,1,1,2,2,2,4,3,1,1,3,3,2,1,2,2,2,1);
    // this.mainChartData1.push(this.random(50, 200));
    // this.mainChartData1.push(this.random(50, 200));
    // this.mainChartData1.push(this.random(50, 200));
    //this.mainChartData2.push(this.random(80, 100));
    // this.mainChartData2.push(this.random(80, 100));
    // this.mainChartData2.push(this.random(80, 100));
    // this.mainChartData2.push(this.random(80, 100));
    // this.mainChartData2.push(this.random(80, 100));
    // this.mainChartData2.push(this.random(80, 100));
    // this.mainChartData3.push(65);
    console.log(this.mainChartData1);
    //console.log(i);
    console.log(this.mainChartData2);
    //console.log(this.mainChartData3);

    //}
    // this.spinner.show();
    this.service.getUsersList().subscribe(response => {
      this.userData = response.json().data;
      this.userDataLength = this.userData[0].totaluser;
      console.log(this.userDataLength);
      //this.spinner.hide();
      // console.log(this.userData.length);
    });
    this.service.getRecentUsersList().subscribe(response => {
      this.categorysData = response.json().data;
      console.log(this.categorysData);
      //console.log(this.recentUserData.length);
    });
    this.service.getBeautyTipsList().subscribe(response => {
      this.tipsData = response.json().data;
      this.tipsDataLength = this.tipsData.length
      //console.log(this.tipsData.length);
    });
    this.service.getUserActivitiesList().subscribe(response => {
      this.activitiesData = response.json().data;
      this.activitiesDataLength = this.activitiesData.length;
      console.log(this.activitiesData.length);
    });
    this.service.getVideoTestmonials().subscribe(response => {
      this.videoData = response.json().data;
      this.videoDatalength = this.videoData.length;
      // console.log(this.videoData.length);
    });
    this.service.getWrittenTestmonials().subscribe(response => {
      this.writtenData = response.json().data;
      this.writtenDataLength = this.writtenData.length
      // console.log(this.writtenData.length);
    });
    this.service.getMindBodyCoupons().subscribe(response => {
      this.mindBodyData = response.json().data;
      this.mindBodyDatalength = this.mindBodyData.length
      //console.log(this.mindBodyData.length);
    });
    this.service.getPerksList().subscribe(response => {
      this.perksData = response.json().data;
      this.perksDataLength = this.perksData.length
      //console.log(this.perksData.length);
    });
    this.userCount();
    this.spinner.hide();
  }
  transformJsonToCustomFormat(input: any[]) {
    //console.log(input);
    const response = [];

    input.forEach(item => {
      console.log(item.count)
      response.push(
        item.count

      );

    });

    return response;
  }
  transformJsonToCustomFormat1(input: any[]) {
    //console.log(input);
    const response = [];

    input.forEach(item => {
      console.log(item.count)
      response.push(
        item.dayname

      );

    });

    return response;
  }
  userCount() {
    this.service.getMaleCount().subscribe(response => {
      this.num1 = response.json().data[0].total;

    });
    this.service.getFemaleCount().subscribe(response => {
      this.num2 = response.json().data[0].total;


    });

  }
  testFun() {
    this.totalUsers = this.num1 + this.num2;
    this.maleUserCount = Math.round(((this.num1) / (this.totalUsers)) * 100)
    this.femaleUserCount = 100 - this.maleUserCount;
    this.maleUserCount = this.maleUserCount / 100;
    this.femaleUserCount = this.femaleUserCount / 100;
    // console.log( this.totalUsers);

  }
  radioModel: string = 'Month';

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A'
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public mainChartElements = 30;


  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = [];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(50 / 5),
          max: 50
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


}
