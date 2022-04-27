import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserReportComponent } from './browser-report/browser-report.component';
import { CompileComponent } from './compile/compile.component';
import { CountriesReportComponent } from './countries-report/countries-report.component';
import { DayVisitReportComponent } from './day-visit-report/day-visit-report.component';
import { DeviceReportComponent } from './device-report/device-report.component';
import { PageViewReportComponent } from './page-view-report/page-view-report.component';
import { SessionReportComponent } from './session-report/session-report.component';
import { SourceReportComponent } from './source-report/source-report.component';

const routes: Routes = [
  {
    path: 'users',
    component: DayVisitReportComponent
  },
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'devices',
    component: DeviceReportComponent
  },
  {
    path: 'countries',
    component: CountriesReportComponent
  },
  {
    path: 'browsers',
    component: BrowserReportComponent
  },
  {
    path: 'sources',
    component: SourceReportComponent
  },
  {
    path: 'pages',
    component: PageViewReportComponent
  },
  {
   path: 'sessions',
   component: SessionReportComponent 
  },
  {
    path: 'compile',
    component: CompileComponent 
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
