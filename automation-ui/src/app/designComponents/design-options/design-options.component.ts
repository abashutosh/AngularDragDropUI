import { Component, OnInit, Input, Inject } from '@angular/core';
import { ICommonService } from '../../interfaces/interfaces';
declare const fabric: any;

@Component({
  selector: 'nextdev-comp-design-options',
  templateUrl: './design-options.component.html',
  styleUrls: ['./design-options.component.css']
})
export class DesignOptionsComponent implements OnInit {

  @Input() parentCanvas: string;
  @Input() selectedItem: any;
  private canvas: any;
  private selected: any;


  constructor(@Inject('ICommonService') private commonService: ICommonService) { }

  ngOnInit() {
    this.canvas = this.parentCanvas;
  }

  sendToBack() {
    let activeObject = this.canvas.getActiveObject();
    let activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.sendToBack();
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }

  bringToFront() {
    //console.log("Called Bring To Front..!")
    let activeObject = this.canvas.getActiveObject();
    let activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.bringToFront();
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }

  clone() {
    let activeObject = this.canvas.getActiveObject();
    let activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
  }

  cleanSelect() {
    this.canvas.deactivateAllWithDispatch().renderAll();
  }

}
