import { TestBed } from '@angular/core/testing';

import { ClientGuardService } from './client-guard.service';

describe('ClientGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientGuardService = TestBed.get(ClientGuardService);
    expect(service).toBeTruthy();
  });
});
