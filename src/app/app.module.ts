import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayVisitReportComponent } from './day-visit-report/day-visit-report.component';
import { queryReportService } from './services/queryReport.service';
import { DeviceReportComponent } from './device-report/device-report.component';
import { CountriesReportComponent } from './countries-report/countries-report.component';
import { BrowserReportComponent } from './browser-report/browser-report.component';
import { SourceReportComponent } from './source-report/source-report.component';
import { PageViewReportComponent } from './page-view-report/page-view-report.component';
import { SessionReportComponent } from './session-report/session-report.component';
import { CompileComponent } from './compile/compile.component';

@NgModule({
  declarations: [
    AppComponent,
    DayVisitReportComponent,
    DeviceReportComponent,
    CountriesReportComponent,
    BrowserReportComponent,
    SourceReportComponent,
    PageViewReportComponent,
    SessionReportComponent,
    CompileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [queryReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
