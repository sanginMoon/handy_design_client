import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDataComponent } from './component-data.component';

describe('ComponentDataComponent', () => {
  let component: ComponentDataComponent;
  let fixture: ComponentFixture<ComponentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
