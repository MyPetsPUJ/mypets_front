import { TestBed } from '@angular/core/testing';

import { TipoDocsService } from './tipo-docs.service';

describe('TipoDocsService', () => {
  let service: TipoDocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
