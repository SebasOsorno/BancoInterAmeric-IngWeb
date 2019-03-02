import { TestBed } from '@angular/core/testing';

import { CodeAuthenticationService } from './code-authentication.service';

describe('CodeAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeAuthenticationService = TestBed.get(CodeAuthenticationService);
    expect(service).toBeTruthy();
  });
});
