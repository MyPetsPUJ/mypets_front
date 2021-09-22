import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalesAdoptadosComponent } from './animales-adoptados.component';

describe('AnimalesAdoptadosComponent', () => {
  let component: AnimalesAdoptadosComponent;
  let fixture: ComponentFixture<AnimalesAdoptadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalesAdoptadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalesAdoptadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
