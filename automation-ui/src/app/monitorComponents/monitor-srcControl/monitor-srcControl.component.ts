import { Component, OnInit } from '@angular/core';


@Component({
  selector:'nextdev-comp-src-control',
  templateUrl: './monitor-srcControl.component.html',
  styleUrls: ['./monitor-srcControl.component.css']
})
export class MonitorSrcControlComponent implements OnInit {
  title = 'Source Control Component';
  constructor(){
    //later
}

  ngOnInit() {
    // this.nodeService.getFiles().then(files => this.files = files);
    //console.log(this.nodeService.getFiles());
  }

}
