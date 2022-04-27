import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserReportComponent } from './browser-report.component';

describe('BrowserReportComponent', () => {
  let component: BrowserReportComponent;
  let fixture: ComponentFixture<BrowserReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
