import { template } from '@angular/core/src/render3';
import { PrimeTemplate } from 'primeng/components/common/shared';
import { Component, OnInit, ViewChild, TemplateRef, Input, ViewChildren, QueryList, ContentChildren, ViewContainerRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-sample-table',
  templateUrl: './sample-table.component.html',
  styleUrls: ['./sample-table.component.scss']
})
export class SampleTableComponent implements OnInit {

  @ViewChild('tHeader') tHeader:TemplateRef<any>;
  @ViewChild('tBody') tBody:TemplateRef<any>;

 // @ViewChild('temp') tabPanels: TemplateRef<any>;

  public  headerCol:any   = {};

  constructor(
    private vcf : ViewContainerRef
  ) { }


  ngOnInit() {
  }

  public setHeader(type:string, data:any) {
    this.headerCol[type]   = data;
  }

  public getHeader(type:string) {

    return this[type];
  }

}
