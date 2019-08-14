import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPrecioComponent } from './filtro-precio.component';

describe('FiltroPrecioComponent', () => {
  let component: FiltroPrecioComponent;
  let fixture: ComponentFixture<FiltroPrecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroPrecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
