import { Card } from 'primeng/card';
import { SampleTableComponent } from './../sample-table/sample-table.component';

import { CommonService } from './../../service/common.service';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, ApplicationRef, Injector, ViewRef, TemplateRef, ViewContainerRef, NgZone, ElementRef, ChangeDetectorRef, EmbeddedViewRef, DoBootstrap, Directive, CompilerFactory, Compiler, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TemplateService } from 'src/app/service/template.service';
import * as $ from 'jquery';
import { Table, TableService } from 'primeng/table';
import { Header, Footer } from 'primeng/components/common/shared';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit, AfterContentInit {

  @ViewChild('card') card: any;
  @ViewChild('cardbasic') cardbasic:any;
  @ViewChild('compTest') copmTest:ElementRef;

  public html:any;
  public headerCol = ["aaaa", "bbb", "ccc", "ddd"];

  
  
  public cars:any[] = [
    {vin : "AAAAA", year : '2018', brand : 'BBB', color : 'RED'},
    {vin : "AAAAA", year : '2018', brand : 'BBB', color : 'RED'},
    {vin : "AAAAA", year : '2018', brand : 'BBB', color : 'RED'},
  ];

  
  constructor(
    public tempService: TemplateService,
    public commService: CommonService,
    private appRef : ApplicationRef,
    private injector: Injector,
    private viewRef: ViewContainerRef,
    private compFR: ComponentFactoryResolver,
    private zone: NgZone,
    private elRef: ElementRef,
    public cd: ChangeDetectorRef,
    private cpf: CompilerFactory,
    private tableService: TableService

    
  ) {
   }

  ngOnInit() {
  }

  ngAfterContentInit() {

    console.log(this.card);
    console.log(this.cardbasic);
  }


  public  testComp:SampleTableComponent;


  addTable(type:string, el:ElementRef) {
    console.log(el);

    const tempF   = this.compFR.resolveComponentFactory(SampleTableComponent);
    const tempRef  = tempF.create(this.injector);
    
    tempRef.instance.setHeader(type, ["aaaa", "bbb", "ccc", "ddd", "eeee"]);


    this.testComp   = tempRef.instance;
    const compF   = this.compFR.resolveComponentFactory(Table);
    const compRef = compF.create(this.injector, [], el);

    compRef.instance.headerTemplate   = tempRef.instance.getHeader(type);
    this.appRef.attachView(compRef.hostView);
  }


  changeHeader() {

    this.testComp.setHeader('tBody', ["dsfsd", "gdd"]);
  }
  

 addComp() {


    const $card     = $("<p-card></p-card>");
    const $header   = $("<p-header></p-header>");
    const $footer   = $("<p-footer></p-footer>");

    $(this.copmTest.nativeElement).append($card);
    $(this.copmTest.nativeElement).append($header);
    $(this.copmTest.nativeElement).append($footer);

    const cardF   = this.compFR.resolveComponentFactory(Card);
    const cardRef  = cardF.create(this.injector, [], $card[0]);

    const headerF   = this.compFR.resolveComponentFactory(Header);
    const headerRef  = headerF.create(this.injector, [], $header[0]);

    const footerF   = this.compFR.resolveComponentFactory(Footer);
    const footerRef  = footerF.create(this.injector, [], $footer[0]);



    cardRef.instance.headerFacet  = headerRef.instance;
    cardRef.instance.footerFacet  = footerRef.instance;

    this.appRef.attachView(cardRef.hostView);
 }

 public items: MenuItem[] = [
    {label:'Categories'},
    {label:'Sports'},
    {label:'Football'},
    {label:'Countries'},
    {label:'Spain'},
    {label:'F.C. Barcelona'},
    {label:'Squad'},
    {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link'}
  ];
 public home: MenuItem  = {icon: 'pi pi-home'};

 public clsss = "comp";

}
