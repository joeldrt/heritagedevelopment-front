import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInmuebleComponent } from './detalle-inmueble.component';

describe('DetalleInmuebleComponent', () => {
  let component: DetalleInmuebleComponent;
  let fixture: ComponentFixture<DetalleInmuebleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInmuebleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
