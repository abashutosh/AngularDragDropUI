import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { DesignService } from '../Services/design.service';
import { PushNotificationService } from 'ng-push-notification';
import { TemplateDataService } from '../Services/template-data.service';

import 'fabric';
import { ILoaderMessage, IToolProperties } from '../models/viewModels';
import { spinnerType } from '../models/enums';
import { IMessageService, ICommonService, } from '../interfaces/interfaces';
import { AccordionDataService } from '../Services/accordionData.service';
import { IAccordionComponent, IAccordionProps_CICD, AccordionProp_CICD } from '../interfaces/interfaces';
import { AccordionPropService } from '../Services/accordionProps.service';
declare const fabric: any;

import { ICanvasProps, CanvasProps } from '../interfaces/interfaces';
import { forEach } from '@angular/router/src/utils/collection';
import { isNull, isNullOrUndefined } from 'util';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'nextdev-comp-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

  private canvas: any;


  private props: ICanvasProps = new CanvasProps();
  accordionData: IAccordionComponent[] = [];

  private accordionProps: IAccordionProps_CICD = new AccordionProp_CICD();
  private accordionPropsDataCollection: any[];
  templateDataResult: any[];
  tools_installed: any[];
  templateName: any[];

  private textString: string;
  private url: string = '';
  private size: any = {
    width: 1410,
    height: 1000
  };

  errorMessage: string;

  private json: any;
  private globalEditor: boolean = false;
  private textEditor: boolean = false;
  private imageEditor: boolean = false;
  private figureEditor: boolean = false;
  private isConfirmConnector: boolean = false;
  private showSpinner: boolean = false;
  private selected: any;
  private imageOffsetX;
  private imageOffsetY;

  private xCord;
  private yCord;
  private imgPath: string;

  private last: MouseEvent;
  private el: HTMLElement;
  private dragEnd: boolean = false;
  private mouseDown: boolean = false;
  jsonDataToSend: any;
  private previousJsonData: any;
  private selectedNodeImgPath: string;
  private nodePropCollection: any;
  private nodeType = '';
  private nodeName = '';

  iToolProperties: IToolProperties = {
    name: '',
    type: '',
    version: '',
    iSCMProperties: { devOpsEnvironment: '', projectName: '', projectID: '', projectOwner: '' }
  };

  loaderMessage: ILoaderMessage = { id: '', headerMessage: 'Loading', footerMessage: 'ApplicationLoading', showLoader: true, type: spinnerType.small };

  @HostListener('mouseup')
  onMouseup() {
    this.dragEnd = false;
  }


  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this.mouseDown) {
      this.xCord = event.clientX;
      this.yCord = event.clientY;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    this.mouseDown = true;
    this.last = event;
  }

  constructor(private _accordionSvc: AccordionDataService,
    private _accordionPropService: AccordionPropService,
    private _templateDataService: TemplateDataService,
    private router: Router,
    private designService: DesignService,
    private pushNotification: PushNotificationService,
    @Inject('ICommonService') private commonService: ICommonService,
    @Inject('IMessageService') private messageService: IMessageService) {

    pushNotification.requestPermission();
    this.commonService.EvtComponentDeleted.subscribe((result: boolean) => {

      this.rasterizeJSON();
    });
  }

  ngOnInit() {

    //Get Accordion data from json
    this.getAccordionData();
    this.getTemplateData();
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

          objects.forEach((o) => {
            if (o.get('type') === 'line') {
              if (o.lineFromObjectId === movingObjectId) {
                objectCorner = o.lineFromObjectCorner;
                points = this.findTargetPortForMovingObject(e.target, objectCorner);
                o.set({ x1: points[0], y1: points[1] });
              }
              else if (o.lineToObjectId === movingObjectId) {
                objectCorner = o.lineToObjectCorner;
                points = this.findTargetPortForMovingObject(e.target, objectCorner);
                o.set({ x2: points[0], y2: points[1] });
              }
            }
            if (o.get('type') === 'triangle') {
              if (o.toObjectId === movingObjectId) {
                objectCorner = o.triObjectCorner;
                points = this.findTargetPortForMovingObject(e.target, objectCorner);
                o.set({ left: points[0] + 7, top: points[1] - 5 });
              }
              // console.log("Triangle object",o);
            }
          });
        }
      },
      'object:modified': (e) => {
        // this.rasterizeJSON();
      },
      'object:selected': (e) => {
        let selectedObject = e.target;
        this.selected = selectedObject;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        if (this.selected._element) {
          this.selectedNodeImgPath = this.selected._element.currentSrc;
          this.reLoadNodeProperties();
        }
        this.resetPanels();
      },
      'selection:cleared': (e) => {
        this.selected = null;
        this.resetPanels();
        this.nodePropCollection = [];
      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);

    this.setCanvasImage();
    this.messageService.LoaderMessage = { id: '', headerMessage: 'Loading', footerMessage: 'Application Loading...', showLoader: false, type: spinnerType.small };

  }

  getAccordionData() {
    this._accordionSvc.getAccordionMenus()
      .subscribe(response => {
        this.accordionData = response['AccordionData'];
      },
        error => this.errorMessage = <any>error
      );
  }

  getTemplateData() {
    this._templateDataService.getAllTemplateData()
      .subscribe(response => {
        this.templateDataResult = response['TemplateData'];
      },
        error => this.errorMessage = <any>error
      );
  }

  selectTemplate(name: string) {
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
              this.selectedNodeImgPath = InstalledToolimageSrc;
              this.getNodeSpecificProps();
              this.updateProperties(this.nodePropCollection);
            });
          }
        }
      }
    }
  }

  filterAccordionData(type) {
    return this.accordionData.filter(x => x.type === type);
  }

  handleDrop(e) {
    var offset = this.canvas;
    let el = e.target;
    this.xCord = e.clientX;
    this.yCord = e.clientY;
    var y = e.clientY - (this.canvas._offset.top - this.imageOffsetY / 4);
    var x = e.clientX - (this.canvas._offset.left + this.imageOffsetX / 2);
    if (this.imgPath) {

      fabric.Image.fromURL(this.imgPath, (image) => {
        image.set({
          left: x,
          top: y,
          angle: 0,
          padding: 0,
          cornersize: 10,
          hasRotatingPoint: true,
          peloas: 12
        });
        image.setWidth(120);
        image.setHeight(120);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
        this.selectedNodeImgPath = this.imgPath;
        this.getNodeSpecificProps();
        this.updateProperties(this.nodePropCollection);
      });
    }
    return false;
  }

  getNodeSpecificProps() {
    if (this.selectedNodeImgPath) {
      var imgName = this.selectedNodeImgPath.substr(this.selectedNodeImgPath.lastIndexOf('assets'));
      for (let j = 0; j < this.accordionData.length; j++) {
        if (imgName === this.accordionData[j].imageSrc) {
          this.accordionPropsDataCollection = this._accordionPropService.getAccordionSpecifcProps(this.accordionData[j].type);
          this.accordionPropsDataCollection = Object.keys(this.accordionPropsDataCollection).map((key) => { return { key: key, value: this.accordionPropsDataCollection[key] }; });
          this.nodePropCollection = '';
          this.nodeType = this.accordionData[j].type;
          this.nodeName = this.accordionData[j].name;
          return this.nodePropCollection = this.accordionPropsDataCollection;
        }
      }
    }
  }


  updateProperties(obj: any) {
    let testArr: any = [];
    let mappingObject = {};

    obj.forEach(element => {
      mappingObject[element.key] = element.value;
    });
    testArr.push(mappingObject);
    this.rasterizeJSON(testArr);
  }

  removeByValue(jsondata, selected_tool) {
    let tools_to_install = jsondata.tools_to_install;
    for (var i = 0; i < tools_to_install.length; i++) {
      if (tools_to_install[i].name.toLowerCase() === selected_tool) {
        tools_to_install.splice(i, 1);
        //console.log('tools_to_install is- ', tools_to_install);
        //console.log('arr is- ' , jsondata);
        this.json = JSON.stringify(jsondata, null, ' ');
        break;
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.removeSelected();
    }
  }

  removeSelected() {
    let activeObject = this.canvas.getActiveObject();
    let activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      const selected_tool_UI = activeObject._element.currentSrc.replace(/^.*[\\\/]/, ''); // to get name from image path
      const active_selected_tool_UI = selected_tool_UI.slice(0, -4).toLowerCase();
      this.removeByValue(this.jsonDataToSend, active_selected_tool_UI);
      this.canvas.remove(activeObject);
      //  this.commonService.IsComponentDeleted = true;
    }
  }

  reLoadNodeProperties() {
    let mappingObject = {};
    if (this.json) {
      try {
        if (this.selectedNodeImgPath) {
          let gotNode: boolean = false;
          var imgName = this.selectedNodeImgPath.substr(this.selectedNodeImgPath.lastIndexOf('assets'));

          for (let j = 0; j < this.accordionData.length; j++) {
            if (imgName === this.accordionData[j].imageSrc && !gotNode) {
              this.jsonDataToSend.tools_to_install.forEach(element => {
                if (element.type === this.accordionData[j].type) {

                  let reLoadData = element.ExtraProps[0];
                  this.nodePropCollection = '';
                  this.nodePropCollection = Object.keys(reLoadData).map((key) => { return { key: key, value: reLoadData[key] }; });
                  this.nodeType = element.type;
                  this.nodeName = element.name;
                  gotNode = true;
                }
              });
            }
          }
        }
      }
      catch (e) {
        //  console.log(e);
      }
    }
  }

  AddUpdateNodeInJson(currentNode) {
    try {
      //Get current json
      if (this.previousJsonData && !isNull(currentNode)) {

        let isNewNode: boolean = true;

        //Check if current json contains the node and
        //its type matchwes with current node's type
        this.previousJsonData.tools_to_install.forEach(element => {
          if (element.type === currentNode.type) {
            element.ExtraProps = currentNode.ExtraProps;
            this.jsonDataToSend = this.previousJsonData;
            isNewNode = false;
            return;
          }
        });
        if (isNewNode) {
          this.previousJsonData.tools_to_install.push(currentNode);
          this.jsonDataToSend = this.previousJsonData;
        }

      }
    }
    catch (e) {
      // console.log(e);
    }
  }

  changeSize(event: any) {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  addText() {
    let textString = this.textString;
    let text = new fabric.IText(textString, {
      left: 20,
      top: 100,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.selectItemAfterAdded(text);
    this.textString = '';

    this.hideModalTextBox();
  }

  clearImgPath(event: any) {
    this.imgPath = '';
  }

  getImgPolaroid(event: any) {
    this.imgPath = '';
    let el = event.target;
    this.imgPath = el.src;
    this.imageOffsetX = el.clientWidth;
    this.imageOffsetY = el.clientHeight;
  }

  addImageOnCanvas(url) {
    if (url) {
      var hasConnector = false;
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
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
      });
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target['result'];
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url) {
    this.url = '';
  }

  showModalTextBox() {
    let canvasElement: any = document.getElementById('modalDialog_Text');
    canvasElement.style.display === 'block' ? canvasElement.style.display = 'none' : canvasElement.style.display = 'block';
  }

  hideModalTextBox() {
    let canvasElement: any = document.getElementById('modalDialog_Text');
    canvasElement.style.display = 'none';
  }

  addFigure(figure) {
    let add: any;
    var x = this.xCord - this.canvas._offset.left;
    var y = this.yCord - this.canvas._offset.top;
    var hasConnector = false;
    var startPoint;
    var endPoint;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: x, top: y, angle: 0,
          hasBorder: true,
          stroke: 'black',
          strokeWidth: 0.5,
          fill: 'transparent'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: x, top: y, angle: 0,
          hasBorder: true,
          stroke: 'black',
          strokeWidth: 0.5,
          fill: 'transparent'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: x, top: y, hasBorder: true,
          stroke: 'black',
          strokeWidth: 0.5,
          fill: 'transparent'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: x, top: y, hasBorder: true,
          stroke: 'black',
          strokeWidth: 0.5,
          fill: 'transparent'
        });
        break;
      case 'arrow':
        var triangle = new fabric.Triangle({
          width: 10,
          height: 15,
          fill: 'black',
          left: x, top: y,
          angle: 90
        });
        var line = new fabric.Line([50, 100, 200, 100], {
          left: x - 160, top: y + 5,
          stroke: 'black'
        });
        var objs = [line, triangle];
        var alltogetherObj = new fabric.Group([line, triangle]);
        add = alltogetherObj;
        break;
      case 'doubleArrow':
        var doubleArrowTriangle = new fabric.Triangle({
          width: 10,
          height: 15,
          fill: 'black',
          left: x, top: y,
          angle: 90
        });
        var triangle2 = new fabric.Triangle({
          width: 10,
          height: 15,
          fill: 'black',
          left: x - 170, top: y + 11,
          angle: 270
        });
        var doubleArrowLine = new fabric.Line([50, 100, 200, 100], {
          left: x - 160, top: y + 5,
          stroke: 'black'
        });
        // tslint:disable-next-line:no-duplicate-variable
        var objs = [triangle2, doubleArrowLine, doubleArrowTriangle];
        var doubleArrowAlltogetherObj = new fabric.Group([triangle2, doubleArrowLine, doubleArrowTriangle]);
        add = doubleArrowAlltogetherObj;
        break;
      case 'data':
        add = new fabric.Polygon([
          { x: 50, y: 0 },
          { x: 250, y: 0 },
          { x: 225, y: 70 },
          { x: 25, y: 70 }], {
            left: x, top: y,
            angle: 0,
            hasBorder: true,
            stroke: 'black',
            strokeWidth: 1,
            fill: 'transparent'
          }
        );
        break;
      case 'decision':
        add = new fabric.Polygon([
          { x: 100, y: 0 },
          { x: 150, y: 50 },
          { x: 100, y: 100 },
          { x: 50, y: 50 }], {
            left: x, top: y,
            angle: 0,
            hasBorder: true,
            stroke: 'black',
            strokeWidth: 1,
            fill: 'transparent'
          }
        );
        break;
      case 'arrow':
        var arrowTriangle = new fabric.Triangle({
          width: 10,
          height: 15,
          fill: '#ff3333',
          left: 170,
          top: 10,
          angle: 90
        });
        var arrowLine = new fabric.Line([50, 100, 200, 100], {
          left: 10,
          top: 15,
          stroke: '#ff3333'
        });
        // tslint:disable-next-line:no-duplicate-variable
        var objs = [line, arrowTriangle];
        var arrowTriangleAlltogetherObj = new fabric.Group([arrowLine, arrowTriangle]);
        add = arrowTriangleAlltogetherObj;
        break;
      case 'data':
        add = new fabric.Polygon([
          { x: 50, y: 0 },
          { x: 250, y: 0 },
          { x: 225, y: 70 },
          { x: 25, y: 70 }], {
            left: 10,
            top: 10,
            angle: 0,
            stroke: 'black',
            strokeWidth: 1
          }
        );
        break;
      case 'decision':
        add = new fabric.Polygon([
          { x: 100, y: 0 },
          { x: 150, y: 50 },
          { x: 100, y: 100 },
          { x: 50, y: 50 }], {
            left: 10,
            top: 10,
            angle: 0,
            stroke: 'black',
            strokeWidth: 1
          }
        );
        break;

    }

    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
    this.rasterizeJSON();
  }

  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
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

  setCanvasImage() {
    let self = this;
    if (this.props.canvasImage) {
      this.canvas.setBackgroundColor({ source: this.props.canvasImage, repeat: 'repeat' }, function () {
        // self.props.canvasFill = '';
        self.canvas.renderAll();
      });
    }
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) { return; }

    if (object.setSelectionStyles && object.isEditing) {
      var style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    }
    else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }

  setActiveProp(name, value) {
    var object = this.canvas.getActiveObject();
    if (!object) { return; }
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  confirmClear() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
      this.setCanvasImage();
      this.json = '';
      this.previousJsonData.tools_to_install = [];
      this.jsonDataToSend.tools_to_install = [];
    }
  }

  rasterize() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
      var image = new Image();
      image.src = this.canvas.toDataURL('png');
      var w = window.open('');
      w.document.write(image.outerHTML);
    }
  }

  rasterizeSVG() {
    //console.log(this.canvas.toSVG())
    // window.open(
    //   'data:image/svg+xml;utf8,' +
    //   encodeURIComponent(this.canvas.toSVG()));
    // //console.log(this.canvas.toSVG())
    // var image = new Image();
    // image.src = this.canvas.toSVG()
    var w = window.open('');
    w.document.write(this.canvas.toSVG());
  }

  // saveCanvasToJSON(event) {
  //   //console.log(event);
  //   //console.log(event.target);
  //   this.rasterizeJSON();
  //   // let json = JSON.stringify(this.canvas);
  //   // localStorage.setItem('Kanvas', json);
  //   let theJSON = JSON.parse(this.json);
  //   this.saveCanvasToJsonUsingJS(theJSON);
  // }

  loadJsonOnCanvas() {
    //console.log("loadJsonOnCanvas...!");
  }

  saveCanvasToJsonUsingJS(theJSON) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-16,' + encodeURIComponent(theJSON));

    element.setAttribute('download', 'NexDev_CanvasDesign.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  loadCanvasFromJSON() {
    let CANVAS = localStorage.getItem('Kanvas');
    //console.log('CANVAS');

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      //console.log('CANVAS untar');
      //console.log(CANVAS);

      // making sure to render canvas at the end
      this.canvas.renderAll();

      // and checking if object's "name" is preserved
      //console.log('this.canvas.item(0).name');
      //console.log(this.canvas);
    });

  }

  rasterizeJSON(obj: any = null) {
    this.json = JSON.stringify(this.canvas, null, 2);
    this.jsonDataToSend = { 'tools_to_install': [], 'inventory': [] };
    const parsedJson = JSON.parse(this.json);
    //  console.log('parsed json', parsedJson);
    const activeObject = this.canvas.getActiveObject();

    if (parsedJson) {
      let flgValue: boolean = false;
      for (let i = 0; i < parsedJson.objects.length; i++) {
        const left = parsedJson.objects[i].left;
        const top = parsedJson.objects[i].top;


        for (let j = 0; j < this.accordionData.length; j++) {
          let jsonSelected_object: any;
          if (this.accordionData[j].type === this.nodeType && this.accordionData[j].name === this.nodeName) {
            jsonSelected_object = {
              'name': this.accordionData[j].name,
              'type': this.accordionData[j].type,
              'version': this.accordionData[j].version,
              'left': left,
              'top': top,
              'ExtraProps': obj,
            };

            if (!flgValue && isNullOrUndefined(this.previousJsonData) || !flgValue && this.previousJsonData.tools_to_install.length === 0) {
              this.jsonDataToSend.tools_to_install.push(jsonSelected_object);
            }
            flgValue = true;
            this.AddUpdateNodeInJson(jsonSelected_object);
            break;
          }
        }
        const str = JSON.stringify(this.jsonDataToSend);
        this.previousJsonData = this.jsonDataToSend;
      }
    } //
    this.json = JSON.stringify(this.jsonDataToSend, null, ' ');
  }

  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }

  publishHandler(event) {
    this.designService.publish(this.jsonDataToSend).subscribe(res => {
      if (res) {
        const options = { // set options
          body: 'Your environment is being created.\nYou will be notified when it is ready!',
          // icon: 'assets/images/ironman.png' // adding an icon
        };
        this.pushNotification.show('Success', options);

      } else {
        const options = { // set options
          body: 'Error occured while publishing Design.',
          // icon: 'assets/images/ironman.png' // adding an icon
        };
        this.pushNotification.show('Error', options);
      }
    },
      error => {
        const options = { // set options
          body: 'Error occured while publishing Design.',
          // icon: 'assets/images/ironman.png' // adding an icon
        };
        this.pushNotification.show('Error', options);
      });

    this.showSpinner = false;
  }

  publishDesign(event) {
    this.showSpinner = true;
    setTimeout(() => {
      this.publishHandler(event);
    }, 7000);
  }

  confirmConnector() {
    this.isConfirmConnector = true;
    var line;
    var triangle;
    var isMouseDown;
    var objects;
    var fromObject;
    var fromObjectId;
    var toObjectId;
    var toObject;
    var points;
    var pointsEnd;


    objects = this.canvas.getObjects();
    objects.forEach(function (o) {
      o.set('active', true);
      o.set('hasRotatingPoint', false);
      o.lockScalingX = o.lockScalingY = true;
      o.setControlsVisibility({ tl: false, tr: false, br: false, bl: false });
    });
    this.canvas.renderAll();

    this.canvas.on('mouse:down', (o) => {
      if (this.isConfirmConnector === true) {
        if (o.target) {
          // console.log('down');

          fromObject = o.target;
          fromObjectId = o.target.toObject().id;

          // console.log(o.target.toObject().id);


          if (fromObject.__corner === undefined) {
            alert('Click on a node');
            return;
          }

          isMouseDown = true;

          var connectorLineFromPort = fromObject.__corner;
          points = this.findTargetPort(fromObject);


          line = new fabric.Line(points, {
            strokeWidth: 2,
            fill: 'black',
            stroke: 'black',
            originX: 'center',
            originY: 'center',
            lineFromObjectId: fromObjectId,
            lineToObjectId: '',                         //filler value, will be changed
            lineFromObjectCorner: connectorLineFromPort,
            lineToObjectCorner: '' //filler value, will be changed
          });

          this.canvas.add(line);
          this.extend(line, this.randomId());
          // console.log("LINEEEEE",line.aCoords.angle);
        }
        return;
      }
    });

    this.canvas.on('mouse:move', (o) => {
      if (this.isConfirmConnector === true) {
        if (!isMouseDown) {
          return;
        }

        var pointer = this.canvas.getPointer(o.e);
        line.set({ x2: pointer.x, y2: pointer.y });
        this.canvas.renderAll();
      }
    });

    this.canvas.on('mouse:up', (o) => {
      if (this.isConfirmConnector === true) {
        if (o.target) {
          // console.log('up');
          isMouseDown = false;
          toObject = o.target;
          toObjectId = o.target.toObject().id;
          var toPort = toObject.__corner;

          if (toPort === undefined || toPort === null || toPort === 0 || fromObject === toObject) {
            this.canvas.remove(line);
          }
          else {
            pointsEnd = this.findTargetPort(toObject);
            fromObject.hasConnector = true;
            toObject.hasConnector = true;
            line.lineToObjectId = toObjectId;
            line.lineToObjectCorner = toPort;
            var pointer = this.canvas.getPointer(o.e);
            triangle = new fabric.Triangle({
              width: 10,
              height: 18,
              fill: 'black',
              left: pointer.x + 7,
              top: pointer.y - 5,
              toObjectId: toObjectId,
              triObjectCorner: line.lineToObjectCorner,
              angle: 90,
            });

            this.canvas.add(triangle);
            // console.log("TRIANGLE ADDED")
          }
        }
        else {
          this.canvas.remove(line);
        }
      }
    });
  }

  exitConnector() {
    var objects;
    this.isConfirmConnector = false;
    objects = this.canvas.getObjects();
    objects.forEach(function (o) {
      o.set('active', false);
      o.set('hasRotatingPoint', true);
      o.lockScalingX = o.lockScalingY = false;
      o.setControlsVisibility({ tl: true, tr: true, br: true, bl: true });
    });
    this.canvas.renderAll();

  }

  findTargetPort(object) {
    var points = new Array(4);
    var port = object.__corner;
    //console.log(port);

    switch (port) {

      case 'mt':
        points = [
          object.left + (object.width / 2), object.top,
          object.left + (object.width / 2), object.top
        ];
        break;
      case 'mr':
        points = [
          object.left + object.width, object.top + (object.height / 2),
          object.left + object.width, object.top + (object.height / 2)
        ];
        break;
      case 'mb':
        points = [
          object.left + (object.width / 2), object.top + object.height,
          object.left + (object.width / 2), object.top + object.height
        ];
        break;
      case 'ml':
        points = [
          object.left, object.top + (object.height / 2),
          object.left, object.top + (object.height / 2)
        ];
        break;
    }
    return points;

  }

  findTargetPortForMovingObject(object, port) {
    var points = new Array(2);
    switch (port) {
      case 'mt':
        points = [
          object.left + (object.width / 2), object.top
        ];
        break;
      case 'mr':
        points = [
          object.left + object.width, object.top + (object.height / 2)
        ];
        break;
      case 'mb':
        points = [
          object.left + (object.width / 2), object.top + object.height
        ];
        break;
      case 'ml':
        points = [
          object.left, object.top + (object.height / 2)
        ];
        break;
    }
    return points;
  }
}
