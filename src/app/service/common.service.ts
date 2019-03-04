import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Messages } from 'primeng/messages';


@Injectable()
export class CommonService {

  public commDialog:ConfirmDialog;
  public commMessage:Messages;

  public codeData:any;
  public messageData:any;
  

  constructor(
    private http: HttpClient,
    private confirmService: ConfirmationService,
    private messageService: MessageService
  ) {

    this.getCodeData();
    this.getMessageData();
  }


  //======================================================================================
  // Common Data Load
  //======================================================================================
  getCodeData() {
    
    this.http.get<any>("/assets/data/code.json").subscribe(data => {
      this.codeData = data;
    });
  }


  getMessageData() {

    this.http.get<any>("/assets/data/message.json").subscribe(data => {
      this.messageData = data;
    });
  }

  getMessageDataById(id) {
    
    let cols        = id.split(".");
    let message:any = this.messageData;

    for (let i = 0 ; i < cols.length ; i ++) {
      message   = message[cols[i]];
    }
    return message;
  }

  getMessageDataById2(id, param:string[]) {

    let message  = this.messageData[id];
    
    if (typeof message == "object") {
      for (let item in message) {
        for (let i = 0 ; i < param.length ; i ++) {
          message[item]   = message[item].replace("{" + param[i] + "}");
        }
      }
    } else {
      for (let i = 0 ; i < param.length ; i ++) {
        message   = message.replace("{" + param[i] + "}");
      }
    }

    return message;
  }
  //======================================================================================


  //======================================================================================
  // Code Data Import / Export
  //======================================================================================
  getCodeImport(category:string, code:any) {
    const codeData  =  this.codeData[category].filter(item => item.code == code);

    if (codeData.length > 0) {
      return codeData[0];
    } else {
      return {};
    }
  }

  getCodeExport(code:any) {

    if (code) {
      return code.code;
    } else {
      return '';
    }
  }
  //======================================================================================


  //======================================================================================
  // Message 관련 서비스 처리. (Dialog)
  //======================================================================================
  

  doDialog(type:string, option:any) {
    

    let msgOption:any = Object.assign({
      message   : 'Are you sure that you want to proceed?',
      header    : (type == "alert") ? 'Alert' : 'Confirmation',
      icon      : 'pi pi-exclamation-triangle',
      rejectVisible : (type == "alert") ? false : true,
      accept    : () => {},
      reject    : () => {}
    }, option);

  

    this.confirmService.confirm(msgOption);
  }

  doMessage(type:string, message:any) {

    this.messageService.clear();
    if (message != '') {
      this.messageService.add({severity: type, summary:'', detail: message});
      setTimeout(() => {
        this.messageService.clear();
      }, 190000);
    }
  }

  doServiceError(error:any) {
    this.messageService.add({severity: "error", summary:'Server Error', detail: error.statusText});
  }

  doServiceFinash(option:any, data:any) {
    // 서비스 메세지 처리.
    if (data.result.code == 0) {
      
      // Success message
      if (option.message && option.message.success) {
        this.doMessage("success", option.message.success);
      }

      // callback
      if (option.success) {
        option.success(data);
      }
    } else {
      // Fail message
      if (option.message && option.message.success) {
        this.doMessage("error", option.message.fail);
      }

      // callback
      if (option.fail) {
        option.fail(data);
      }
    }
  }
  //======================================================================================

  //======================================================================================
  // UTIL
  //======================================================================================
  getSelectData(data:any, keyCol:string, keyVal:any) {

    // Key Value 초기화
    if (!keyVal) {
      keyVal = "";
    }

    if (data) {
      let selectData = data.filter(item => item[keyCol] == keyVal);

      if (selectData.length > 0) {
        return selectData[0];
      } else {
        return "";
      }
    } else {
      return keyVal;
    }
  }

  //======================================================================================


  //======================================================================================
  // Component Dynamic Create
  //======================================================================================

  
}
