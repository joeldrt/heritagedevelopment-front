import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUsersComponent } from './property-users.component';

describe('PropertyUsersComponent', () => {
  let component: PropertyUsersComponent;
  let fixture: ComponentFixture<PropertyUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
