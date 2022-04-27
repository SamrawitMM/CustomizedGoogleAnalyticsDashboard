import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesReportComponent } from './countries-report.component';

describe('CountriesReportComponent', () => {
  let component: CountriesReportComponent;
  let fixture: ComponentFixture<CountriesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
