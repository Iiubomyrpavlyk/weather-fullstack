import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackLayoutComponent } from './feedback-layout.component';

describe('FeedbackLayoutComponent', () => {
  let component: FeedbackLayoutComponent;
  let fixture: ComponentFixture<FeedbackLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
