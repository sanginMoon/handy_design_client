import { ComponentDataComponent } from './../component-data/component-data.component';
import { CommonService } from './../../../service/common.service';
import { DataService } from './../../../service/data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { TemplateService } from 'src/app/service/template.service';
import { DialogService } from 'primeng/api';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {

  @ViewChild('preView') preView:ElementRef;
  @ViewChild('propDialog') propDialog:any;
  @ViewChild('previewDialog') previewDialog:any;

  public domain               = "/template/component";
  public comp:any             = {};
  public compRef:any;
  public propertys:any        = [];
  public propertyVal:any      = {};
  public cCategory:any;
  public cPropertyBoolean:any = {"code" : false, "name" : "false"};
  public cPropertyUse:any;
  public task:string          = "mod";
  public dataDailog:boolean   = false;

  constructor(
    public commService:CommonService,
    public dataService: DataService, 
    public tempService:TemplateService,
    public dialogService: DialogService
    ) { }

  ngOnInit() {
  }


  getDetail(item:any) {

    this.task   = "mod";

    // 초기화
    this.propertys  = [];
    this.comp       = Object.assign({}, item);

    console.log(this.comp);

    this.comp.category = this.commService.getSelectData(this.commService.codeData.category, "code", this.comp.category);
    this.comp.useYn = this.commService.getSelectData(this.commService.codeData.yn, "code", this.comp.useYn);

    // 속성정보 배열로 변환.
    const props = this.comp.property;

    for (var prop in props) {

      // Dropdown Value Setting..
      const userYn  = this.commService.getSelectData(this.commService.codeData.yn, "code", props[prop].useYn);
      const dsType  = this.commService.getSelectData(this.commService.codeData.domType, "code", props[prop].dsType);

      let value     = props[prop].value;

      if (props[prop].inType == "data") {
        value   = this.commService.getSelectData(this.tempService.data.component, "_id", props[prop].value);
      } else if (props[prop].type == "boolean") {
        value  = this.commService.getSelectData(this.commService.codeData.boolean, "code", props[prop].value);
      } 

      this.propertys.push ({
        "name"    : props[prop].name,
        "type"    : props[prop].type,
        "inType"  : props[prop].inType,
        "value"   : value,
        "useYn"   : userYn,
        "dsType"  : dsType,
        "description" : ""
      })
    }

    // 미리보기 지정
    this.preview();
  }


  add() {
    this.task   = "mod";
  }

  save() {

   const inData   = this.getSaveData();

    if (this.validation()) {
      if (this.task == "add") {
        this.insert(inData);
      } else {
        this.update(inData);
      }
    }
  }

  insert(inData) {

    let url     = this.domain + "/add";
    let option  = {
      method    : 'POST',
      message   : this.commService.getMessageDataById("common.insert"),
      bodyData  : inData,
      success   : (data:any) => {

        for (let i = 0 ; i < this.tempService.components.length ; i ++) {
          if (this.tempService.components[i]._id == inData._id) {
            this.tempService.components[i]    = inData;
            break;
          }
        }
      },
      fail      : (data:any) => {
      }
    };

    this.dataService.apiData(url, option);

  }

  update(inData) {

    let url     = this.domain + "/mod";
    let option  = {
      method    : 'POST',
      message   : this.commService.getMessageDataById("common.update"),
      bodyData  : inData,
      success   : (data:any) => {
        
        for (let i = 0 ; i < this.tempService.components.length ; i ++) {
          if (this.tempService.components[i]._id == inData._id) {
            this.tempService.components[i]    = inData;

            console.log("aaaaa");
            break;
          }
        }
      },
      fail      : (data:any) => {
      }
    };

    this.dataService.apiData(url, option);
  }

  delete() {
    const inData  = {id : this.comp.id};
  }


  validation() {
    return true;
  }

  getSaveData() {

    let saveData  = Object.assign({}, this.comp);
    let props  = {};

    for (let i = 0 ; i < this.propertys.length ; i++) {
      let item  = this.propertys[i];
      let prop = {};
      
      for (let subitem in item) {

        if (subitem == 'value') {
          if (item.inType == 'data') {
            prop['value'] = item[subitem]._id;
          } else if (item.type == "boolean") {
            prop['value'] = item[subitem]['code'];
          } else {
            prop['value'] = item[subitem];
          }
        } else if (subitem == 'useYn' || subitem == 'dsType') {
          prop[subitem] = item[subitem]['code'];
        } else {
          prop[subitem] = item[subitem];
        }
      }

      props[item.name] = prop;
    }
    saveData.property  = props;
    saveData.category  = saveData.category.code;
    saveData.useYn     = saveData.useYn.code;

    delete saveData.compRef;

    return saveData;
  }


  setProperty(item) {

    /*
    let val:any;
    
    if (item.useYn.code == "Y") {
      try {
        if (item.inType == 'data') {
          val = item.value.data;
        } else if (item.type == 'boolean') {
          val = item.value.code;
        } else {
          val = item.value;
        }
        this.compRef.instance[item.name] = val;

        if (this.comp.id == 'blockui' && item.name == 'blocked') {
          setTimeout(() => {
            this.compRef.instance['blocked']  = false;
          }, 3000);
        }
      } catch(e) { }
    }
    */
    let setValue:any;

    if (item.inType == 'data') {
      setValue = item.value.data;
    } else if (item.type == 'boolean') {
      setValue = item.value.code;
    } else {
      setValue = item.value;
    }

    let setData = {
      name    : item.name,
      useYn   : item.useYn.code,
      type    : item.type,
      inType  : item.inType,
      value   : setValue
    }
    this.tempService.setComponentProperty(this.comp, setData);
  }


  preview() {
      // Comp Template Add
      $(this.preView.nativeElement).empty();
      const $compEl   = $(this.comp.tag);

      $(this.preView.nativeElement).append($compEl);
      this.compRef        = this.tempService.createComponent(this.comp.id, $compEl[0]);
      this.comp.compRef   = this.compRef;

      for (let i = 0 ; i < this.propertys.length ; i++) {
        this.setProperty(this.propertys[i]);
      }
  }



  showComponentData(item) {

    const ref = this.dialogService.open(ComponentDataComponent, {
      header  : 'Component Data',
      data    : {
        type : 'component',
        subType : item.type
      },
      width   : "600px",
      contentStyle: {"max-height": "400px", "overflow": "auto"}
    });
  }


  sample() {
    
  }
}
