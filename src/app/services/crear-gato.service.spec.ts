import { TestBed } from '@angular/core/testing';

import { CrearGatoService } from './crear-gato.service';

describe('CrearGatoService', () => {
  let service: CrearGatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearGatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
