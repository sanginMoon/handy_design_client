import { CommonService } from './common.service';
import { DataService } from './data.service';
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ComponentRef } from '@angular/core/src/render3';

import { Breadcrumb } from 'primeng/breadcrumb';
import { Card } from 'primeng/card';
import { BlockUI } from 'primeng/blockui';
import { ColorPicker } from 'primeng/colorpicker';
import { InputSwitch } from 'primeng/inputswitch';
import { Editor } from 'primeng/editor';
import { Panel } from 'primeng/panel';
import { Table } from 'primeng/table';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  public baseUrl:string     = "/template";
  public components:any     = [];
  public data:any           = {};


  constructor(
    public dataService: DataService,
    public commService: CommonService,
    private compFR: ComponentFactoryResolver,
    private appRef : ApplicationRef,
    private injector: Injector
  ) {
    this.getComponent();
    this.getComponentData();
   }

   getComponent() {

    const url     = this.baseUrl + "/component/list";
    const option  =  {
      method    : "GET",
      bodyData  : {},
      success   : ((data:any)  => {
        this.components   = data.data.filter(item => item.useYn == "Y");
      })
    };
    this.dataService.apiData(url, option);
   }

   getComponentData(callback?:any) {
     
    const url     = this.baseUrl + "/component/data/list";
    const option  =  {
      method    : "GET",
      bodyData  : {},
      success   : ((data:any)  => {

        this.data.component           = data.data;
        this.data.component.array     = data.data.filter(item => item.subType == 'array');
        this.data.component.MenuItem  = data.data.filter(item => item.subType == 'MenuItem');

        if (callback) {
          callback();
        }
      })
    };
    this.dataService.apiData(url, option);
    return new Observable(option.success);
   }


   getComponentDataById(id) {
    return this.data.component.filter(item => item.id == id);
   }

   createComponent(id:string, el:any) {

    let compFactory:any;

    if (id.toLowerCase() == "breadcrumb") {
      compFactory = this.compFR.resolveComponentFactory(Breadcrumb);
    } else if (id.toLowerCase() == "blockui") {
      compFactory = this.compFR.resolveComponentFactory(BlockUI);
    } else if (id.toLowerCase() == "card") {
      compFactory = this.compFR.resolveComponentFactory(Card);
    } else if (id.toLowerCase() == 'panel') {
      compFactory = this.compFR.resolveComponentFactory(Panel);
    } else if( id.toLowerCase() == 'editor' ) {
      compFactory = this.compFR.resolveComponentFactory(Editor);
    } else if (id.toLowerCase() == 'inputswitch') {
      compFactory = this.compFR.resolveComponentFactory(InputSwitch);
    } else if (id.toLowerCase() == 'colorpicker') {
      compFactory = this.compFR.resolveComponentFactory(ColorPicker);
    } else if (id.toLowerCase() == 'table') {
      compFactory = this.compFR.resolveComponentFactory(Table);
    }
    
    const compRef     = compFactory.create(this.injector, [], el);
    this.appRef.attachView(compRef.hostView);

    return compRef;
  }

   setComponentProperty(comp, property:any ) {

    if (property.useYn == "Y") {
      try {
        if (property.inType == "template") {

          if (comp.id == 'table') {
            comp.tempComp.setTemplateData("tHeader", property.value.header);
            comp.tempComp.setTemplateData("tBody", property.value.body);
          }
        } else {
          let val:any;

          if (property.inType == 'data') {
            val = property.value;
          } else if (property.type == 'boolean') {
            val = property.value;
          } else {
            val = property.value;
          }
          comp.compRef.instance[property.name] = val;
          
          // 후처리..
          if (comp.id == 'blockui' && property.name == 'blocked') {
            setTimeout(() => {
              comp.compRef.instance['blocked']  = false;
            }, 3000);
          }
        }
      } catch(e) { }

    }
   }
}
