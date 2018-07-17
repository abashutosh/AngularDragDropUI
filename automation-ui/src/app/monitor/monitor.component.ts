import { Component, OnInit } from '@angular/core';
import { MonitorSrcControlComponent } from './../monitorComponents/monitor-srcControl/monitor-srcControl.component';
import { MonitorOperationsComponent } from './../monitorComponents/monitor-operations/monitor-operations.component';
import { MonitorDeploymentComponent } from './../monitorComponents/monitor-deployment/monitor-deployment.component';
import { MonitorBuildComponent } from './../monitorComponents/monitor-build/monitor-build.component';

// import {TreeModule} from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { SvcTreeDataService } from '../Services/svc-tree-data.service';

@Component({
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  files: TreeNode[];
  selectedFile: TreeNode;
  selectedNodeName: any;

  constructor(private nodeService: SvcTreeDataService) { }
 envflag: boolean;
 projectflag: boolean;
  ngOnInit() {

    this.nodeService.getMonitorData().then(files => this.files = files);
    this.selectFirstNode();
    // this.selectedFile = this.files[0];
    // console.log(' this selected -',this.selectedFile);
   // console.log('get files()',this.nodeService.getFiles());
  }

  selectFirstNode(){
    this.envflag = true;
    this.projectflag = false;
  }


  nodeSelect(event) {
    this.envflag = false;
    this.projectflag= false;

      if(event.node.label === 'Environment 1' || event.node.label === 'Environment 2' ){
        this.envflag = true;
      }
      this.selectedNodeName = event.node.label;
      if(this.selectedNodeName === 'Project E1-1' ||  event.node.label === 'Project E1-2' || event.node.label === 'Project E2-1' || event.node.label === 'Project E2-2') {
          this.projectflag = true;
      }
    }
}
