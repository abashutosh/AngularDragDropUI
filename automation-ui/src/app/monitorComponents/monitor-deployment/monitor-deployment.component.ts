import { Component, OnInit } from '@angular/core';
// import { LineChartDemoComponent } from '../monitor-charts/monitor-charts-line/monitor-linecharts.component';


@Component({
  selector:'nextdev-comp-deployment',
  templateUrl: './monitor-deployment.component.html',
  styleUrls: ['./monitor-deployment.component.css']
})
export class MonitorDeploymentComponent implements OnInit {
  title = 'Deployment Component';
  constructor(){
    //later
}

  ngOnInit() {
    // this.nodeService.getFiles().then(files => this.files = files);
    //console.log(this.nodeService.getFiles());
  }

}
