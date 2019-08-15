import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoPropiedadComponent } from './filtro-tipo-propiedad.component';

describe('FiltroTipoPropiedadComponent', () => {
  let component: FiltroTipoPropiedadComponent;
  let fixture: ComponentFixture<FiltroTipoPropiedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroTipoPropiedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
