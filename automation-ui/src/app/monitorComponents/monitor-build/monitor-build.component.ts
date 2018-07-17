import { Component, OnInit } from '@angular/core';

@Component({
  selector:'nextdev-comp-build',
  templateUrl: './monitor-build.component.html',
  styleUrls: ['./monitor-build.component.css']
})
export class MonitorBuildComponent implements OnInit {
  title = 'Build Component';
  constructor(){
    //later
}

  ngOnInit() {
    // this.nodeService.getFiles().then(files => this.files = files);
    //console.log(this.nodeService.getFiles());
  }

}
