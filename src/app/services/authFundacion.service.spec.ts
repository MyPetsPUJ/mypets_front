import { TestBed } from '@angular/core/testing';

import { AuthFundacionService } from './authFundacion.service';

describe('AdoptanteService', () => {
  let service: AuthFundacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFundacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
