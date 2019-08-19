import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroMasComponent } from './filtro-mas.component';

describe('FiltroMasComponent', () => {
  let component: FiltroMasComponent;
  let fixture: ComponentFixture<FiltroMasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroMasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
