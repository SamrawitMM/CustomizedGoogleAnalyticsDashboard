import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayVisitReportComponent } from './day-visit-report.component';

describe('DayVisitReportComponent', () => {
  let component: DayVisitReportComponent;
  let fixture: ComponentFixture<DayVisitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayVisitReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
