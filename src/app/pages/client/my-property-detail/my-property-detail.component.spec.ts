import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPropertyDetailComponent } from './my-property-detail.component';

describe('MyPropertyDetailComponent', () => {
  let component: MyPropertyDetailComponent;
  let fixture: ComponentFixture<MyPropertyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPropertyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
