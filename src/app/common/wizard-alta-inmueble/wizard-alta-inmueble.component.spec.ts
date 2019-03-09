import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardAltaInmuebleComponent } from './wizard-alta-inmueble.component';

describe('WizardAltaInmuebleComponent', () => {
  let component: WizardAltaInmuebleComponent;
  let fixture: ComponentFixture<WizardAltaInmuebleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardAltaInmuebleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardAltaInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
