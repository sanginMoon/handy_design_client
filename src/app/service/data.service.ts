import { Observable, observable, of } from 'rxjs';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Options } from 'selenium-webdriver';

@Injectable()
export class DataService {

  public dataUrl    = "http://localhost:3000";
  public succBack:any;

  constructor(
    private http: HttpClient,
    private commService: CommonService
  ) { }


  commData(name:string) {
    return this.http.get<any>("/assets/data/" + name + ".json");
  }

  storageData() {
  }


  apiData(url, option:any) {

    let apiUrl          = this.dataUrl + url;
    let httpOption:any  = {}
    let headerData:any  = {"Content-Type" : "application/json"}; 
    let bodyData:any;

    // Header 셋팅
    if (option.header) {
      headerData   = Object.assign(headerData, option.header);
    } 
    httpOption.headers    = new HttpHeaders(headerData);

    // Form Data 셋팅
    if (option.formData) {
      bodyData  = new FormData();

      for (let item in option.formData) {
        bodyData.append(item, option.formData[item]);
      }
    } else {
      bodyData  = option.bodyData;
    }

    const apiOption:any   = {
      method      : option.method,
      httpOption  : httpOption,
      bodyData    : bodyData
    };

    // 메시지 처리..
    let msgOption = {
      message : (option.message && option.message.confirm) ? option.message.confirm : '',
      accept  : () => { 
        this._apiData(apiUrl, apiOption).subscribe((data:any) => {
          this.commService.doServiceFinash(option, data);

        }, (error:any) => {
          this.commService.doMessage("error", error.message);
        });
      }
    }

    if (option.message && option.message.confirm) {
      this.commService.doDialog("confirm", msgOption);
    } else {
      msgOption.accept();
    }
  }

  private _apiData(url, apiOption) {
    
    if (apiOption.method === "GET") {
      return this.http.get<any>(url, apiOption.httpOption);
    } else if (apiOption.method === "POST") {
      return this.http.post<any>(url, apiOption.bodyData, apiOption.httpOption);
    } else if (apiOption.method === "PATCH") {
      return this.http.patch<any>(url, apiOption.bodyData, apiOption.httpOption);
    } 
  }

}
