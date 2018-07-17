import { Component, OnInit } from '@angular/core';
// import { LineChartDemoComponent } from '../monitor-charts/monitor-charts-line/monitor-linecharts.component';

@Component({
  selector:'nextdev-comp-operations',
  templateUrl: './monitor-operations.component.html',
  styleUrls: ['./monitor-operations.component.css']
})
export class MonitorOperationsComponent implements OnInit {
  title = 'Operations Component';
  constructor(){
    //later
}

  ngOnInit() {
    // this.nodeService.getFiles().then(files => this.files = files);
    //console.log(this.nodeService.getFiles());
  }

}
