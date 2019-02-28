import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardService } from '../../services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  completeDashboardData: any
  public mainChartData1: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public mainChartData2: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private spinner: NgxSpinnerService, private service: DashboardService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getallCountForDashboard().subscribe(res => {
      this.spinner.hide();
      this.completeDashboardData = res["data"];
    })
    this.service.getGraphdata().subscribe(response => {
      let days = [];
      let dayName = [];
      let i = 0;
      let j = 0;
      let graphData = response["data"];
      for (i = 29; i >= 0; i--) {
        var dateOffset = (24 * 60 * 60 * 1000) * i;
        var myDate = new Date();
        myDate.setTime(myDate.getTime() - dateOffset);
        days.push(myDate.getDate())
        var weekday = ["S", "M", "T", "W", "T", "F", "S"];
        dayName.push(myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" + weekday[myDate.getDay()])
        if (i == 0) {
          this.mainChartLabels = dayName;
        }
      }
      for (i = 0; i < graphData.length; i++) {
        let _index = days.indexOf(graphData[i].day)
        if (_index) {
          this.mainChartData1[_index] = graphData[i].total
          this.mainChartData2[_index] = graphData[i].debit
        }
      }
    });
  }


  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Credit'
    },
    {
      data: this.mainChartData2,
      label: 'Debit'
    }
  ];
  public mainChartLabels: Array<any> = [];
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
          beginAtZero: true,
          callback: function (value: any) {
            return value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
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
}