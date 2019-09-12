import { TestBed } from '@angular/core/testing';

import { ForgottenPasswordService } from './forgotten-password.service';

describe('ForgottenPasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgottenPasswordService = TestBed.get(ForgottenPasswordService);
    expect(service).toBeTruthy();
  });
});
