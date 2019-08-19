import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAmenidadesComponent } from './filtro-amenidades.component';

describe('FiltroAmenidadesComponent', () => {
  let component: FiltroAmenidadesComponent;
  let fixture: ComponentFixture<FiltroAmenidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAmenidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAmenidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
