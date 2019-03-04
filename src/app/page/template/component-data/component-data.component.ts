import { DataService } from './../../../service/data.service';
import { CommonService } from './../../../service/common.service';
import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/service/template.service';
import { JsonPipe } from '@angular/common';
import { DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-component-data',
  templateUrl: './component-data.component.html',
  styleUrls: ['./component-data.component.scss']
})
export class ComponentDataComponent implements OnInit {

  public task:string        = "add";
  public baseUrl:string     = "/template/component/data";
  public componentData:any  = [];
  public selectData:any;

  public type:any           = "";
  public subType:any        = "";

  constructor(
    public commService: CommonService,
    public dataService: DataService,
    public tempService : TemplateService,
    public config: DynamicDialogConfig,
    private jsonPipe: JsonPipe
  ) { }

  ngOnInit() {

    this.type     = this.config.data.type;
    this.subType  = this.config.data.subType;

    // Component Data Load..
    this.getData('NEW');
  }

  getData(id) {

    this.componentData  = [];
    this.componentData.push({
        id : 'NEW',
        name : 'NEW DATA',
        type : this.type,
        subType : this.subType,
        description : '',
        useYn : true,
        data: undefined
      });

      // 배열 합치기.

      let filterData = this.tempService.data.component[this.subType];
      
       for (let i = 0 ; i < filterData.length ; i++) {
        this.componentData.push(
          {
            _id : filterData[i]._id,
            name : filterData[i].name,
            type : filterData[i].type,
            subType : filterData[i].subType,
            description : filterData[i].description,
            useYn : filterData[i].useYn,
            data: this.jsonPipe.transform(filterData[i].data)
          }
        );
      }

      if (id == 'NEW') {
        this.selectData   = this.componentData[0];
      } else {
        const tempData = this.componentData.filter(item => item._id == id);

        if (tempData.length == 0) {
          this.selectData   = this.componentData[0];
        } else {
          this.selectData   = tempData[0];
        }
      }
  }


  save() {

    if (this.selectData.id) {
      this.insert();
    } else {
      this.update();
    }
  }

  // 저장.
  insert() {

    const url     = this.baseUrl + "/add"
    const message = this.commService.getMessageDataById("common.insert");

    this.apiCall(url, message);
  }

  // 수정..
  update() {

    const url     = this.baseUrl + "/mod"
    const message = this.commService.getMessageDataById("common.update");

    this.apiCall(url, message);

  }

  // 삭제..
  delete() {
    
    const url     = this.baseUrl + "/del"
    const message = this.commService.getMessageDataById("common.delete");

    this.apiCall(url, message);
  }


  apiCall(url, message) {

    // Json Parsing...
    let dataToJson:any;
    try{
      dataToJson  = JSON.parse(this.selectData.data)
    } catch(e) {
      this.commService.doDialog('alert', {
        message : "DATA Json 파싱오류 발생하였습니다."
      });
      return;
    }

    const saveData  = Object.assign({}, this.selectData, {data: dataToJson});

    const option  = {
      method  : "POST",
      message : message,
      bodyData : saveData,
      success : (data) => {
        this.tempService.getComponentData(() => {
          this.getData(saveData._id);
        })
      }
    };

    this.dataService.apiData(url, option);
  }

  fnTest() {
    console.debug();
  }
}
