import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptameComponent } from './adoptame.component';

describe('AdoptameComponent', () => {
  let component: AdoptameComponent;
  let fixture: ComponentFixture<AdoptameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
