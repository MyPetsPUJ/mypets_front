import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundacionPreviewComponent } from './fundacion-preview.component';

describe('FundacionPreviewComponent', () => {
  let component: FundacionPreviewComponent;
  let fixture: ComponentFixture<FundacionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundacionPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundacionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
