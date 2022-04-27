import { Component } from '@angular/core';
import { queryReportService } from './services/queryReport.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any;
  constructor(
    private queryReport: queryReportService,
   
) {
    


}
  ngOnInit() {

    let myReq = {
    "reportRequests": [
    {
    "viewId": "264530163",
    "dateRanges": [
          {
            "startDate": "2022-04-11",
            "endDate": "2022-04-12"
       }],
          "metrics": [
            {
           "expression": "ga:users"
         }, {
              "expression": "ga:sessions"
           }]
        }]

}
  this.data = this.queryReport.getAnalytics(myReq);

  console.log(this.data)}
  title = 'angular-analytics';
}
