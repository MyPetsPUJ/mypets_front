import { TestBed } from '@angular/core/testing';

import { CrearFundacionService } from './crearFundacion.service';

describe('AdoptanteService', () => {
  let service: CrearFundacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearFundacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
