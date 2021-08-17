import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionAnimalComponent } from './seleccion-animal.component';

describe('SeleccionAnimalComponent', () => {
  let component: SeleccionAnimalComponent;
  let fixture: ComponentFixture<SeleccionAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
