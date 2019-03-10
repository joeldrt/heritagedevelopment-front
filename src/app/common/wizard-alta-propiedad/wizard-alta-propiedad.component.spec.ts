import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardAltaPropiedadComponent } from './wizard-alta-propiedad.component';

describe('WizardAltaInmuebleComponent', () => {
  let component: WizardAltaPropiedadComponent;
  let fixture: ComponentFixture<WizardAltaPropiedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardAltaPropiedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardAltaPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
