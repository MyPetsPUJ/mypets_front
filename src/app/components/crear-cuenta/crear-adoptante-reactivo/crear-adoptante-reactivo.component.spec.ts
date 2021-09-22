import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAdoptanteReactivoComponent } from './crear-adoptante-reactivo.component';

describe('CrearAdoptanteReactivoComponent', () => {
  let component: CrearAdoptanteReactivoComponent;
  let fixture: ComponentFixture<CrearAdoptanteReactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAdoptanteReactivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAdoptanteReactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
