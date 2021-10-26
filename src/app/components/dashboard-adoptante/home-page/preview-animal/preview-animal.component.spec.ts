import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAnimalComponent } from './preview-animal.component';

describe('PreviewAnimalComponent', () => {
  let component: PreviewAnimalComponent;
  let fixture: ComponentFixture<PreviewAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
