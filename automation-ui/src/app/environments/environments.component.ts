import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { SvcTreeDataService } from '../Services/svc-tree-data.service';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { TabView, TabPanel } from 'primeng/primeng';
import { ICanvasProps, CanvasProps } from '../interfaces/interfaces';
import { TemplateDataService } from '../Services/template-data.service';
import { IAccordionComponent} from '../interfaces/interfaces';
import { AccordionDataService } from '../Services/accordionData.service';
declare const fabric: any;

@Component({
  selector: 'nextdev-comp-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})
export class EnvironmentsComponent implements OnInit {

  files: TreeNode[];
  selectedFile: TreeNode;
  selectedNodeName = '';

  errorMessage = '';
  private items: MenuItem[];

  public displayComponent = false;
  selectedIndex = 0;
  @ViewChild(TabView) tabView: TabView;

  //Canvas Properties
  private canvas: any;
  private size: any = {
    width: 1370,
    height: 700
  };
  private props: ICanvasProps = new CanvasProps();
  templateDataResult: any[];
  tools_installed: any[];
  accordionData: IAccordionComponent[] = [];
  private nodePropCollection: any;

  constructor(private _environmentNodeService: SvcTreeDataService,
    private _templateDataService: TemplateDataService,
    private _accordionSvc: AccordionDataService) { }

  ngOnInit() {
    this.getTreeNodeData();

    this.getAccordionData();
    this.setCanvasProperties();
    this.getTemplateData();
  }

  nodeSelect(event) {
    this.selectedNodeName = event.node.label;
    this.selectedIndex = 2;
    this.displayComponent = false;

    console.log(this.selectedNodeName);

    this.selectTemplate(this.selectedNodeName);
  }

  handleChange(e) {
    //var index = e.index;
    this.selectedIndex = 2;
  }

  getTreeNodeData(){
    this._environmentNodeService.getEnvironmentData().then(files => this.files = files);
    this.items = [
      {
        label: 'Environment',
        items: [{
          label: 'New Project',
          icon: 'fa-plus',
          command: (event) => {
            this.selectedIndex = 2;
            this.displayComponent = true;
          }
        },
        { label: 'Quit' }
        ]
      }
    ];
  }

  setCanvasProperties(){
     //setup front side canvas
     this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });


    this.canvas.on({
      'object:moving': (e) => {
        if (e.target.hasConnector) {
          var movingObjectId = e.target.toObject().id;
          var objects = this.canvas.getObjects();
          var objectCorner;
          var points = new Array(2);

         
        }
      },
      'object:modified': (e) => {
        // this.rasterizeJSON();
      },
      'object:selected': (e) => {
        let selectedObject = e.target;       
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;       
      },
      'selection:cleared': (e) => {  
        // this.rasterizeJSON();
      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);

    this.setCanvasImage();
    






  }

  setCanvasImage() {
    let self = this;
    if (this.props.canvasImage) {
      this.canvas.setBackgroundColor({ source: this.props.canvasImage, repeat: 'repeat' }, function () {
        // self.props.canvasFill = '';
        self.canvas.renderAll();
      });
    }
  }

  getTemplateData() {
    this._templateDataService.getEnvironmentTemplateData()
      .subscribe(response => {
        this.templateDataResult = response['EnvironmentTemplateData'];
      },
        error => this.errorMessage = <any>error
      );
  }

  getAccordionData() {
    this._accordionSvc.getAccordionMenus()
      .subscribe(response => {
        this.accordionData = response['AccordionData'];
      },
        error => this.errorMessage = <any>error
      );
  }

  selectTemplate(name: string) {
    //name='Environment 1';
    // TODO update json on clear of canvas..
    this.canvas.clear(); // To clear canvas and reset json value.
    this.setCanvasImage();
    // this.json = '';
    // this.previousJsonData.tools_to_install = [];
    // this.jsonDataToSend.tools_to_install = [];

    let templateName = name.toLowerCase();
    var filteredtemplate = this.templateDataResult.filter(d => d.template_Name.toLowerCase() === templateName);
    if (filteredtemplate) {
      for (let i = 0; i < filteredtemplate.length; i++) {
        this.tools_installed = filteredtemplate[i].tools_installed;
      }
    }

    for (let i = 0; i < this.tools_installed.length; i++) {
      let toolName = this.tools_installed[i].name.toLowerCase();
      for (let j = 0; j < this.accordionData.length; j++) {
        if (toolName === this.accordionData[j].name.toLowerCase()) {
          let InstalledToolimageSrc = this.accordionData[j].imageSrc;
          if (InstalledToolimageSrc) {
            fabric.Image.fromURL(InstalledToolimageSrc, (image) => {
              image.set({
                left: this.tools_installed[i].left,
                top: this.tools_installed[i].top,
                angle: 0,
                padding: 10,
                cornersize: 10,
                hasRotatingPoint: true
              });
              image.setWidth(200);
              image.setHeight(200);
              this.extend(image, this.randomId());
              this.canvas.add(image);
              this.selectItemAfterAdded(image);

              //Get node specific props and update the Json
              //this.selectedNodeImgPath = InstalledToolimageSrc;
              //this.getNodeSpecificProps();
              //this.updateProperties(this.nodePropCollection);
            });
          }
        }
      }
    }
  }

  extend(obj, id) {
    obj.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id
        });
      };
    })(obj.toObject);
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
  }

  // getNodeSpecificProps() {
  //   if (this.selectedNodeImgPath) {
  //     var imgName = this.selectedNodeImgPath.substr(this.selectedNodeImgPath.lastIndexOf('assets'));
  //     for (let j = 0; j < this.accordionData.length; j++) {
  //       if (imgName === this.accordionData[j].imageSrc) {
  //         this.accordionPropsDataCollection = this._accordionPropService.getAccordionSpecifcProps(this.accordionData[j].type);
  //         this.accordionPropsDataCollection = Object.keys(this.accordionPropsDataCollection).map((key) => { return { key: key, value: this.accordionPropsDataCollection[key] }; });
  //         this.nodePropCollection = '';
  //         this.nodeType = this.accordionData[j].type;
  //         this.nodeName = this.accordionData[j].name;
  //         return this.nodePropCollection = this.accordionPropsDataCollection;
  //       }
  //     }
  //   }
  // }


}
