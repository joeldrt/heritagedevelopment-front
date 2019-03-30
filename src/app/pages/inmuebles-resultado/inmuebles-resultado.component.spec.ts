import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InmueblesResultadoComponent } from './inmuebles-resultado.component';

describe('InmueblesResultadoComponent', () => {
  let component: InmueblesResultadoComponent;
  let fixture: ComponentFixture<InmueblesResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmueblesResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmueblesResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
