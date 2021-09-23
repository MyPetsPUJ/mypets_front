import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoInteresComponent } from './texto-interes.component';

describe('TextoInteresComponent', () => {
  let component: TextoInteresComponent;
  let fixture: ComponentFixture<TextoInteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextoInteresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoInteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
