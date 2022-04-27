import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewReportComponent } from './page-view-report.component';

describe('PageViewReportComponent', () => {
  let component: PageViewReportComponent;
  let fixture: ComponentFixture<PageViewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
