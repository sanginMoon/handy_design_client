import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-component-template',
  templateUrl: './component-template.component.html',
  styleUrls: ['./component-template.component.scss']
})
export class ComponentTemplateComponent implements OnInit {

  @ViewChild('tHeader') tHeader:TemplateRef<any>;
  @ViewChild('tBody') tBody:TemplateRef<any>;
  @ViewChild('tFooter') tFooter:TemplateRef<any>;

  public tempData:any   = {};

  constructor() {}

  ngOnInit() {
  }

  setTemplateData(type:string, data:any) {
    this.tempData[type] = data;
  }

  getTemplate(type:string) {
    return this[type];

  }

}
