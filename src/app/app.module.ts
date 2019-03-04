
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TemplateRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonPipe } from '@angular/common';

import { AppComponent } from './app.component';

import { ComponentComponent } from './page/template/component/component.component';
import { ComponentDataComponent } from './page/template/component-data/component-data.component';


import { CommonService } from './service/common.service';
import { DataService } from './service/data.service';
import { TemplateService } from './service/template.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {TableModule, Table, TableService} from 'primeng/table';
import {CardModule, Card} from 'primeng/card';
import { PanelModule, Panel } from 'primeng/panel';
import {BlockUIModule, BlockUI} from 'primeng/blockui';
import {BreadcrumbModule, Breadcrumb} from 'primeng/breadcrumb';
import {EditorModule, Editor} from 'primeng/editor';
import {InputSwitchModule, InputSwitch} from 'primeng/inputswitch';
import {ColorPickerModule, ColorPicker} from 'primeng/colorpicker';

import { MessageService, ConfirmationService, DialogService } from 'primeng/api';
import { SampleComponent } from './page/sample/sample.component';
import { SharedModule, PrimeTemplate, Header, Footer } from 'primeng/components/common/shared';
import { SampleTableComponent } from './page/sample-table/sample-table.component';
import { ComponentTemplateComponent } from './page/template/component-template/component-template.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentComponent,
    ComponentDataComponent,
    SampleComponent,
    SampleTableComponent,
    ComponentTemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,


    FormsModule,
    BreadcrumbModule,
    PanelModule,
    CheckboxModule,
    InputTextModule,
    DropdownModule,
    BlockUIModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    MessagesModule,
    CardModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    EditorModule,
    InputSwitchModule,
    ColorPickerModule,
    SharedModule 
    
    
  ],
  providers: [
    CommonService, DataService, TemplateService, MessageService, ConfirmationService, DialogService, JsonPipe, PrimeTemplate, TableService
  ],
  bootstrap: [AppComponent],
  entryComponents : [
    ComponentDataComponent, 
    Panel, BlockUI, Breadcrumb, Editor, InputSwitch, ColorPicker, Card, Table, SampleComponent, SampleTableComponent, Header, Footer
  ]
})
export class AppModule { }
