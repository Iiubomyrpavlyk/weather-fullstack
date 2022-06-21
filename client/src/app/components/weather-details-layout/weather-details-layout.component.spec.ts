import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailsLayoutComponent } from './weather-details-layout.component';

describe('WeatherDetailsLayoutComponent', () => {
  let component: WeatherDetailsLayoutComponent;
  let fixture: ComponentFixture<WeatherDetailsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDetailsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherDetailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
