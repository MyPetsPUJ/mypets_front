import { TestBed } from '@angular/core/testing';

import { CrearPerroService } from './crear-perro.service';

describe('CrearPerroService', () => {
  let service: CrearPerroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearPerroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
