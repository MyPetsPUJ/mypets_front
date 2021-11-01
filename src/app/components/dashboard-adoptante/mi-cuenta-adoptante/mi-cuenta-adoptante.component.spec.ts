import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaAdoptanteComponent } from './mi-cuenta-adoptante.component';

describe('MiCuentaAdoptanteComponent', () => {
  let component: MiCuentaAdoptanteComponent;
  let fixture: ComponentFixture<MiCuentaAdoptanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiCuentaAdoptanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiCuentaAdoptanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
