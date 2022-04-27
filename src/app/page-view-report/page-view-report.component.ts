import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';
import { queryReportService } from '../services/queryReport.service';
// import 'rxjs/add/operator/toPromise';
import {format} from "date-fns"
import * as moment from 'moment';

declare var $: any;
declare var M: any;
@Component({
  selector: 'app-page-view-report',
  templateUrl: './page-view-report.component.html',
  styleUrls: ['./page-view-report.component.css']
})
export class PageViewReportComponent implements OnInit {

  addTrainingForm: FormGroup | any;
  INITIAL_STATE:any = {
    labels: [],
    values: [],
    bgColors: [],
    hoverColors: []
  };

  reportData:any = this.INITIAL_STATE
  queryResult: any
  total:any
  setTotalUsers:any
  setTotalCountries:any
  setReportData:any
  setTotalPages:any

  colors = [
    "#fcba03",
    "#fa8c5c",
    "#9fc934",
    "#60d17e",
    "#45afed",
    "#7c5cdb",
    "#ce5cdb",
    "#db5c97",
  ];

  hoverColors = [
    "#60d17e",
    "#ce5cdb",
    "#fcba03",
    "#db5c97",
    "#fa8c5c",
    "#7c5cdb",
    "#9fc934",
    "#45afed",

  ]

  startDate:any
  endDate:any

  defaultStartDate:any
  defaultEndDate:any

  constructor(private fb: FormBuilder, private qs: queryReportService) { }

  ngOnInit(): void {
    this.addTrainingForm = this.fb.group({
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],

    })

    let currYear = (new Date()).getFullYear();
    console.log(currYear)

   let defaultStartDate = new Date(currYear, 3, 1)
    let defaultEndDate = moment().toDate()

   $(document).ready(function() {

  $(".datepickers").datepicker({
    defaultDate: defaultStartDate,
    setDefaultDate: defaultStartDate,
    minDate: new Date(currYear,3,1),
    // maxDate: new Date(currYear,3,31),
    maxDate: moment().toDate(),
    // yearRange: [2021, currYear],
    yearRange: [currYear],
    format: "yyyy-mm-dd"    
  }, 25);
});

$(document).ready(function() {

  $(".datepickere").datepicker({
    defaultDate: defaultEndDate,
    setDefaultDate: defaultEndDate,
    minDate: new Date(currYear,3,1),
    maxDate: moment().toDate(),
    yearRange: [currYear],
    format: "yyyy-mm-dd"    
  }, 25);
});



this.defaultEndDate = format(new Date(defaultEndDate), "yyyy-MM-dd")
this.defaultStartDate = format(new Date(defaultStartDate), "yyyy-MM-dd")

console.log(this.defaultEndDate)
console.log(format(new Date(defaultEndDate), "yyyy-MM-dd"), "    formatted  date")


setTimeout(
  () =>{    
    this.drawChart(this.defaultStartDate, this.defaultEndDate) 

  }, 1500)


  }

  dateChange() {
    if (this.addTrainingForm) {
      this.addTrainingForm.patchValue({start_date : $('#start_date').val()});
    this.addTrainingForm.patchValue({end_date : $('#end_date').val()});
    
  }

  
  console.log(this.end_date.value)

    // setTimeout(() => {
    //   M.updateTextFields();
    //   $('.datepicker').datepicker({
    //     format: 'dd/mmm/yyyy',

    //     // format:'yyyy-mm-dd',
    //     defaultDate: new Date(),
    //     //setDefaultDate: new Date(),
    //     yearRange: 5,
    //     minDate: new Date(new Date().getFullYear() - 5, 0, 1),
    //     maxDate: new Date(new Date().getFullYear(), 12, 31),
    //     onSelect(e:any) {
    //       //localStorage.setItem('selectedDate', e);
    //       console.log(e, "end")
    //     },
    //   });
    // }, 25);
    

  }
  dateStartChange() {
    if (this.addTrainingForm) {
      this.addTrainingForm.patchValue({start_date : $('#start_date').val()});
    // this.addTrainingForm.patchValue({end_date : $('#end_date').val()});
    
  }
  console.log(this.start_date.value)
    
    // setTimeout(() => {
    //   M.updateTextFields();
    //   $('.datepicker').datepicker({
    //     format: 'dd/mmm/yyyy',
    //     // format:'yyyy-mm-dd',
    //     changeMonth: true,

    //     defaultDate: new Date(),
    //     //setDefaultDate: new Date(),
    //     yearRange: 5,
    //     minDate: new Date(new Date().getFullYear() - 5, 0, 1),
    //     maxDate: new Date(new Date().getFullYear(), 12, 31),
    //     onSelect(e:any) {
    //       //localStorage.setItem('selectedDate', e);
    //       console.log(e, "start")
    //     },
    //   });
    // }, 25);
    

  }
  dateEndChange() {
    if (this.addTrainingForm) {
      // this.addTrainingForm.patchValue({start_date : $('#start_date').val()});
    this.addTrainingForm.patchValue({end_date : $('#end_date').val()});
    
  }
  console.log(this.end_date.value)

    // setTimeout(() => {
    //   M.updateTextFields();
    //   $('.datepicker').datepicker({
    //     format: 'dd/mmm/yyyy',

    //     // format:'yyyy-mm-dd',
    //     defaultDate: new Date(),
    //     //setDefaultDate: new Date(),
    //     yearRange: 5,
    //     minDate: new Date(new Date().getFullYear() - 5, 0, 1),
    //     maxDate: new Date(new Date().getFullYear(), 12, 31),
    //     onSelect(e:any) {
    //       //localStorage.setItem('selectedDate', e);
    //       console.log(e, "end")
    //     },
    //   });
    // }, 25);
    

  }
  get start_date() { return this.addTrainingForm.get('start_date'); }
  get end_date() { return this.addTrainingForm.get('end_date'); }


  formatDate (date:any) {
    return format(
      new Date(
        date.substring(0, 4),
        date.substring(4, 6) - 1,
        date.substring(6, 8)
      ),
      "MMM. d, yyyy"
    );
  };
  submitForm(value: any) {
    if (this.addTrainingForm.valid){
//       if(this.setReportData){
        
//         this.setReportData = null

//       }
      
      
//       console.log(value.start_date, value.end_date)
//       this.startDate = value.start_date
//       this.endDate = value.end_date
//       let dimensions =  ["ga:pagePath"]

//       let viewID = "264530163"
//       let metrics = "ga:pageviews"
//       let fieldName = "ga:pageViews"
//       let order = "DESCENDING"
//       let orderBy = {
//         "fieldName": fieldName,
//         "order": order,
//       }
//       let filter = "ga:pagePath!@localhost/"
//       let myReq =  {
//         "reportRequests": [
//           {
//             "viewId": viewID,
//             "filtersExpression": filter,
//             "dateRanges": [
//               {
//                 startDate: value.start_date,
//                 endDate: value.end_date,
//               }
//             ],
//             "metrics": [
//               {
//                 "expression": metrics,
//               }
//             ],           
//             "dimensions": this.qs.requestDimensions(dimensions),
//             "orderBys": orderBy
//           ? [
//               {
//                 "fieldName": orderBy.fieldName,
//                 "sortOrder": orderBy.order,
//               }
//             ]
//           : []
//           }
//         ]
//       }

// //      this.qs.getAnalyticsData(myReq).then(x => { 
// //       toast({ html: 'Training Successfully Added!', classes: 'green' });
// //       this.location.back();
// // });

     

//     let response = this.qs.getAnalytics(myReq)

//     this.qs.getAnalyticsData(myReq).subscribe((report) =>{ 
//       if(report && Object.keys(report).length > 0){
//         console.log(report)

//         this.queryResult = report.body.reports[0].data.rows;
//         if(typeof this.queryResult != 'undefined' && this.queryResult.length > 0 && this.queryResult){
//         this.setTotalPages = this.queryResult.length;
//         console.log(this.queryResult)
//         let total = report.body.reports[0].data.totals[0].values[0]
//         let newReportData:any = [];
//         // this.setTotalCountries = this.queryResult.length
//         this.queryResult.forEach((row:any, idx:any) => {
         
//           if(idx < 10) {
//             let tempObj = {
//               path: row.dimensions[0],
//               views: row.metrics[0].values[0],
//               perc: `${((row.metrics[0].values[0] / total) * 100).toFixed(
//                 1
//               )}%`,
//             }
//             newReportData.push(tempObj)
//           }
         
          

//         })
//         this.setReportData = newReportData
//       }else {
//         console.log('OOPS there is no analytics data stored on these specified dates')

//       }

//       }

//       console.log(this.reportData)
      
//     });

//     // setTimeout(
//     //   () =>{
//     //     this.pieChartBrowser()

//     //   }, 1500)

//      if(response){
//        console.log("response")
//       //  const queryResult = response.body.reports[0].data.rows
//       console.log(response)
//      }
//       // this.data = this.queryReport.getAnalytics(myReq);
let  startDate = value.start_date
let  endDate = value.end_date

//  this.typeofSD = typeof startDate

this.drawChart(startDate, endDate)



  }

   console.log(value.start_date, value.end_date)

   console.log(value.end_date)

  }

  drawChart(start_date:any, end_date:any){
    if(this.setReportData){
        
      this.setReportData = null

    }
    
    
    // console.log(start_date, end_date)
    this.startDate = start_date
    this.endDate = end_date
    let dimensions =  ["ga:pagePath"]

    let viewID = "264530163"
    let metrics = "ga:pageviews"
    let fieldName = "ga:pageViews"
    let order = "DESCENDING"
    let orderBy = {
      "fieldName": fieldName,
      "order": order,
    }
    let filter = "ga:pagePath!@localhost/"
    let myReq =  {
      "reportRequests": [
        {
          "viewId": viewID,
          "filtersExpression": filter,
          "dateRanges": [
            {
              startDate: start_date,
              endDate: end_date,
            }
          ],
          "metrics": [
            {
              "expression": metrics,
            }
          ],           
          "dimensions": this.qs.requestDimensions(dimensions),
          "orderBys": orderBy
        ? [
            {
              "fieldName": orderBy.fieldName,
              "sortOrder": orderBy.order,
            }
          ]
        : []
        }
      ]
    }

//      this.qs.getAnalyticsData(myReq).then(x => { 
//       toast({ html: 'Training Successfully Added!', classes: 'green' });
//       this.location.back();
// });

   

  let response = this.qs.getAnalytics(myReq)

  this.qs.getAnalyticsData(myReq).subscribe((report) =>{ 
    if(report && Object.keys(report).length > 0){
      console.log(report)

      this.queryResult = report.body.reports[0].data.rows;
      if(typeof this.queryResult != 'undefined' && this.queryResult.length > 0 && this.queryResult){
      this.setTotalPages = this.queryResult.length;
      console.log(this.queryResult)
      let total = report.body.reports[0].data.totals[0].values[0]
      let newReportData:any = [];
      // this.setTotalCountries = this.queryResult.length
      this.queryResult.forEach((row:any, idx:any) => {
       
        if(idx < 10) {
          let tempObj = {
            path: row.dimensions[0],
            views: row.metrics[0].values[0],
            perc: `${((row.metrics[0].values[0] / total) * 100).toFixed(
              1
            )}%`,
          }
          newReportData.push(tempObj)
        }
       
        

      })
      this.setReportData = newReportData
    }else {
      console.log('OOPS there is no analytics data stored on these specified dates')

    }

    }

    console.log(this.reportData)
    
  });

  // setTimeout(
  //   () =>{
  //     this.pieChartBrowser()

  //   }, 1500)

   if(response){
     console.log("response")
    //  const queryResult = response.body.reports[0].data.rows
    console.log(response)
   }
    // this.data = this.queryReport.getAnalytics(myReq);
  


  }

}
