import { AfterViewInit, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as Chart from 'chart.js'
import Chart from 'chart.js/auto';
import { queryReportService } from '../services/queryReport.service';
// import 'rxjs/add/operator/toPromise';
import {format} from "date-fns"
import * as moment from 'moment';

declare var $: any;
declare var M: any;
@Component({
  selector: 'app-session-report',
  templateUrl: './session-report.component.html',
  styleUrls: ['./session-report.component.css']
})
export class SessionReportComponent implements OnInit {
  @ViewChild('lineCanvas')
  lineCanvas!: ElementRef;
  lineChart: any;
  addTrainingForm: FormGroup | any;
  INITIAL_STATE:any = {
    labels: [],
    values: [],
  };

  reportData:any = this.INITIAL_STATE
  queryResult: any
  total:any
  setAverage:any
  labels: any = []
  values:any = []

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
//       if(this.lineChart && this.reportData.labels && this.reportData.values){
//         this.lineChart.destroy();
//         this.reportData.labels = []
//         this.reportData.values = []
       

//       }
      
      
//       console.log(value.start_date, value.end_date)
//       this.startDate = value.start_date
//       this.endDate = value.end_date
//       let dimensions = ["ga:date"]

//       let metrics = "ga:users"

//       let viewID = "264530163"
//       let myReq =  {
//         "reportRequests": [
//           {
//             "viewId": viewID,
//             "dateRanges": [
//               {
//                 startDate: value.start_date,
//                 endDate: value.end_date,
//               }
//             ],
           
//             "dimensions": this.qs.requestDimensions(dimensions),
            
//           }
//         ]
//       }

// //      this.qs.getAnalyticsData(myReq).then(x => { 
// //       toast({ html: 'Training Successfully Added!', classes: 'green' });
// //       this.location.back();
// // });

     

//     let response = this.qs.getAnalytics(myReq)

//     let total
//     this.qs.getAnalyticsData(myReq).subscribe((report) =>{ 
//       if(report && Object.keys(report).length > 0){
//         console.log(report)

//         this.queryResult = report.body.reports[0].data.rows;
//         if(!this.isUndefined() && this.queryResult.length > 0 && this.queryResult){
//         console.log(this.queryResult)
//         total = report.body.reports[0].data.totals[0].values[0]
//         console.log(total)
//         this.setAverage = Math.trunc(total/report.body.reports[0].data.rowCount)
//         this.queryResult.forEach((row:any) => {
//           this.reportData.labels.push(this.formatDate(row.dimensions[0]))
//           this.reportData.values.push(row.metrics[0].values[0])

//         })
//       }else{
//         console.log('OOPS there is no analytics data stored on these specified dates')

//       }
//       }

//       console.log(this.reportData)
//       setTimeout(
//         () =>{
//           if(!this.isUndefined() && this.queryResult.length > 0 && this.queryResult){
  
//           this.lineChartMethod()
//           }else {
//             console.log('OOPS there is no analytics data stored on these specified dates')
  
//           }
  
//         }, 1500)
      
//     });

    

//      if(response){
//        console.log("response")
//       //  const queryResult = response.body.reports[0].data.rows
//       console.log(response)
//      }
      // this.data = this.queryReport.getAnalytics(myReq);
    
      let  startDate = value.start_date
      let  endDate = value.end_date
   
     //  this.typeofSD = typeof startDate
   
      this.drawChart(startDate, endDate)


  }

   console.log(value.start_date, value.end_date)

   console.log(value.end_date)

  }
  // ngAfterViewInit(): void {
  //   this.lineChartMethod();
  //   console.log(this.reportData)

  // }

  lineChartMethod() {
    console.log(this.reportData)
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.reportData.labels,
        datasets: [
          {
            label: 'Session',
            fill: false,
            // lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.reportData.values,
            spanGaps: false,
          }
        ]
      }
    });
  }

  isUndefined(): boolean 
  { return typeof this.queryResult === 'undefined'; }

  drawChart(start_date:any, end_date:any){
    if(this.lineChart && this.reportData.labels && this.reportData.values){
      this.lineChart.destroy();
      this.reportData.labels = []
      this.reportData.values = []
     

    }
    
    
    // console.log(value.start_date, value.end_date)
    this.startDate = start_date
    this.endDate = end_date
    let dimensions = ["ga:date"]

    let metrics = "ga:users"

    let viewID = "264530163"
    let myReq =  {
      "reportRequests": [
        {
          "viewId": viewID,
          "dateRanges": [
            {
              startDate: start_date,
              endDate: end_date,
            }
          ],
         
          "dimensions": this.qs.requestDimensions(dimensions),
          
        }
      ]
    }

//      this.qs.getAnalyticsData(myReq).then(x => { 
//       toast({ html: 'Training Successfully Added!', classes: 'green' });
//       this.location.back();
// });

   

  let response = this.qs.getAnalytics(myReq)

  let total
  this.qs.getAnalyticsData(myReq).subscribe((report) =>{ 
    if(report && Object.keys(report).length > 0){
      console.log(report)

      this.queryResult = report.body.reports[0].data.rows;
      if(!this.isUndefined() && this.queryResult.length > 0 && this.queryResult){
      console.log(this.queryResult)
      total = report.body.reports[0].data.totals[0].values[0]
      console.log(total)
      this.setAverage = Math.trunc(total/report.body.reports[0].data.rowCount)
      this.queryResult.forEach((row:any) => {
        this.reportData.labels.push(this.formatDate(row.dimensions[0]))
        this.reportData.values.push(row.metrics[0].values[0])

      })
    }else{
      console.log('OOPS there is no analytics data stored on these specified dates')

    }
    }

    console.log(this.reportData)
    setTimeout(
      () =>{
        if(!this.isUndefined() && this.queryResult.length > 0 && this.queryResult){

        this.lineChartMethod()
        }else {
          console.log('OOPS there is no analytics data stored on these specified dates')

        }

      }, 1500)
    
  });

  

   if(response){
     console.log("response")
    //  const queryResult = response.body.reports[0].data.rows
    console.log(response)
   }
  }

}
