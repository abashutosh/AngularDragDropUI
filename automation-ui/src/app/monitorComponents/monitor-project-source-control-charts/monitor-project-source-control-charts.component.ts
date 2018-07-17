import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'nextdev-comp-monitor-project-source-control-charts',
  templateUrl: './monitor-project-source-control-charts.component.html',
  styleUrls: ['./monitor-project-source-control-charts.component.css']
})
export class MonitorProjectSourceControlChartsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.chart();
  }

  dataCommitsPerteam: any;
  dataCommitsPerUsers: any;
  dataCodeCoverage: any;
  dataProductivity: any;
  msgs: any[];

 chart(){
  this.dataCommitsPerteam = {
    labels: ['Sprint1', 'Sprint2', 'Sprint3', 'Sprint4'],
    datasets: [
        {
            label: 'Team E1-1',
            fill: false,
            borderColor: '#4bc0c0',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'Team E1-2',
            fill: false,
            borderColor: '#5EB5EF',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
// this.dataCommitsPerUsers = {
//   labels: ['Sprint1', 'Sprint2', 'Sprint3', 'Sprint4', 'Sprint5', 'Sprint6', 'Sprint7'],
//   datasets: [
//       {
//           label: 'User E1-1',
//           backgroundColor: '#42A5F5',
//           borderColor: '#1E88E5',
//           data: [12, 8, 23, 32, 19, 22, 39]
//       },
//       {
//           label: 'User E1-2',
//           backgroundColor: '#9CCC65',
//           borderColor: '#7CB342',
//           data: [18, 10, 15, 25, 35, 12, 29]
//       }
//   ]
// };
this.dataCodeCoverage = {
  labels: ['Sprint1', 'Sprint2', 'Sprint3', 'Sprint4'],
  datasets: [
      {
          label: 'Team E1-1',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [52, 88, 96, 97, 99, 92, 99]
      },
      {
          label: 'Team E1-2',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [68, 90, 95, 97, 98, 96, 99]
      }
  ]

};
this.dataProductivity = {
  labels: ['Sprint1', 'Sprint2', 'Sprint3', 'Sprint4'],
  datasets: [
      {
          label: 'Team E1-1',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [90, 94, 92, 93, 95, 91, 98]
      },
      {
          label: 'Team E1-1',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [85, 33, 94, 91, 90, 93, 97]
      }
  ]
};
 }
 selectData(event) {
  this.msgs = [];
  this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.dataCommitsPerteam.datasets[event.element._datasetIndex].data[event.element._index]});
}
}
