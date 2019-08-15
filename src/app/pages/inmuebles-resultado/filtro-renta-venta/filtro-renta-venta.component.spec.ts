import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRentaVentaComponent } from './filtro-renta-venta.component';

describe('FiltroRentaVentaComponent', () => {
  let component: FiltroRentaVentaComponent;
  let fixture: ComponentFixture<FiltroRentaVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroRentaVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRentaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
