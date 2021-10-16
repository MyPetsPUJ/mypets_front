import { TestBed } from '@angular/core/testing';

import { DatosAnimalService } from './datos-animal.service';

describe('DatosAnimalService', () => {
  let service: DatosAnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosAnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
