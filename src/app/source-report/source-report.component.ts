import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';
import { queryReportService } from '../services/queryReport.service';
// import 'rxjs/add/operator/toPromise';
import {format} from "date-fns"
import { Observable } from 'rxjs/internal/Observable';
import * as moment from 'moment';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-source-report',
  templateUrl: './source-report.component.html',
  styleUrls: ['./source-report.component.css']
})
export class SourceReportComponent implements OnInit {
  @ViewChild('barCanvas')
  private barCanvas!: ElementRef;
  barChart: any;

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
  setTotalSources: any

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
  transformToDate(date:any) {
    return new Date(
      date.substring(0, 4),
      date.substring(4, 6) - 1,
      date.substring(6, 8)
    );
  };
   transformAPIData (data:any)  {
    let transformedData:any = [];
    let datesArray:any = [];
    data.forEach((row:any) => {
      transformedData.push({
        date: this.formatDate(row.dimensions[1]),
        source: row.dimensions[0],
        visits: row.metrics[0].values[0],
      });
      datesArray.push(this.transformToDate(row.dimensions[1]));
    });
    return [transformedData, datesArray];
  };

  groupDataBySource (data:any) {
    return data.reduce((r:any, a:any) => {
      r[a.source] = r[a.source] || [];
      r[a.source].push(a);
      return r;
    }, Object.create(null));
  };

  // sortSourcesByTotalVisits = (data:any) => {
  //   let sumedVisits:any = [];
  //   console.log(data)
  //   Object.entries(data).forEach((key:any, value:any) => {
  //     console.log(data[key])
  //     // let value = data[key]
  //     const sumOfVisits = value.reduce((a:any, b:any) => {
  //       return a + parseInt(b.visits);
  //     }, 0);
  //     sumedVisits.push({
  //       source: key,
  //       visits: sumOfVisits,
  //     });
  //   })
  //   return sumedVisits.sort((a:any, b:any) => b.visits - a.visits);
  // };
  sortSourcesByTotalVisits (data:any){
    let sumedVisits:any = [];
    console.log("sort sources by total visits ", data)
    // Object.entries(data).forEach(
    //   ([key, value]) =>{ console.log(key, value)
    //        const sumOfVisits = value.reduce((a:any, b:any) => {
    //         return a + parseInt(b.visits);
    //       }, 0);
    //       sumedVisits.push({
    //         source: key,
    //         visits: sumOfVisits,
    //       });
    //     }

      


    // );
    // return sumedVisits.sort((a, b) => b.visits - a.visits);

    for (let [key, value] of Object.entries(data)) {
      let val:any = value
      const sumOfVisits = val.reduce((a:any, b:any) => {
        return a + parseInt(b.visits);
      }, 0);
      sumedVisits.push({
        source: key,
        visits: sumOfVisits,
      });
    }
    return sumedVisits.sort((a:any, b:any) => b.visits - a.visits);
  };

  createDataForChart(datesArray:any, sumedVisits:any, groupedBySource:any) {
    datesArray.sort((a:any, b:any) => {
      let first = new Date(a);
      let second = new Date(b)
      // let s: any | number = 
      return first.getTime() - second.getTime()
    });
    const datesFormatted = datesArray.map((date:any) =>
      format(new Date(date), "MMM. d, yyyy")
    );
    const uniqueDates = [...new Set(datesFormatted)];
    let datasetsArray:any = [];
    let i = 0;
    sumedVisits.forEach((item:any, id:any) => {
      if (id < 5) {
        const label = item.source;
        const backgroundColor = this.colors[i + 3];
        i++;
        let data:any = [];
        uniqueDates.forEach((date) => {
          const row = groupedBySource[item.source].find(
            (item:any) => item.date === date
          );
          if (row) {
            data.push(parseInt(row.visits));
          } else {
            data.push(0);
          }
        });
        datasetsArray.push({
          label,
          backgroundColor,
          data,
        });
      }
    });
    return { labels: uniqueDates, data: datasetsArray };
  };
  submitForm(value: any) {
    if (this.addTrainingForm.valid){
//       if(this.barChart && this.reportData.labels && this.reportData.values && this.reportData.bgColors){
//         this.barChart.destroy();
//         this.reportData.labels = []
//         this.reportData.values = []
//         this.reportData.bgColors = []

//       }
      
      
//       console.log(value.start_date, value.end_date)
//       this.startDate = value.start_date
//       this.endDate = value.end_date
//       let dimensions =  ["ga:source", "ga:date"]

//       let viewID = "264530163"
//       let metrics = "ga:users"
//       let fieldName = "ga:users"
      
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
//             "metrics": [
//               {
//                 "expression": metrics,
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

//     this.qs.getAnalyticsData(myReq).subscribe((report) =>{ 
//       if(report && Object.keys(report).length > 0){
//         console.log(report)

//         this.queryResult = report.body.reports[0].data.rows;
//         if(!this.isUndefined() && this.queryResult.length > 0 && this.queryResult){
//           const data = this.transformAPIData(this.queryResult)
//           console.log(data)
//           let transformedData = data[0];
//           let datesArray = data[1];
  
//           const groupedBySource = this.groupDataBySource(transformedData);
//           this.setTotalSources = Object.keys(groupedBySource).length;
  
//           const sumedVisits = this.sortSourcesByTotalVisits(groupedBySource);
  
//           const dataForChart = this.createDataForChart(
//             datesArray,
//             sumedVisits,
//             groupedBySource
//           );
  
//           this.reportData.labels = dataForChart.labels;
//           this.reportData.values = dataForChart.data;
//           // this.reportData.bgColors =this.colors
//       //   console.log(this.queryResult)
//       //   this.setTotalUsers = report.body.reports[0].data.totals[0].values[0]
//       //   // this.setTotalCountries = this.queryResult.length
//         this.queryResult.forEach((row:any, id:any) => {
//           //     this.reportData.labels = dataForChart.labels;
//           // this.reportData.values = dataForChart.data;
           
//               // this.reportData.labels.push(row.dimensions[0])
//               // this.reportData.values.push(row.metrics[0].values[0])
//               this.reportData.bgColors.push(this.colors[id])
           
            
  
//           })
//         }else {
//           console.log('OOPS there is no analytics data stored on these specified dates')
//         }
       
        
//       }

//       console.log(this.reportData)
//       setTimeout(
//         () =>{
//           if(!this.isUndefined() && this.queryResult.length > 0 && this.queryResult){
//             this.barChartMethod()
  
//           }
//           else {
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
  //   this.barChartMethod();
  // }

  barChartMethod() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.reportData.labels,
        datasets: [{
          label: this.reportData.values[0].label,
          data: this.reportData.values[0].data,
          backgroundColor:  this.reportData.bgColors,
          borderColor: this.reportData.bgColors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          // yAxes: [{
          //   ticks: {
          //     beginAtZero: true
          //   }
          // }]
        }
      }
    });
  }
  isUndefined(): boolean 
  { return typeof this.queryResult === 'undefined'; }

  drawChart(start_date:any, end_date:any){
    if(this.barChart && this.reportData.labels && this.reportData.values && this.reportData.bgColors){
      this.barChart.destroy();
      this.reportData.labels = []
      this.reportData.values = []
      this.reportData.bgColors = []

    }
    
    
    // console.log(value.start_date, value.end_date)
    this.startDate = start_date
    this.endDate = end_date
    let dimensions =  ["ga:source", "ga:date"]

    let viewID = "264530163"
    let metrics = "ga:users"
    let fieldName = "ga:users"
    
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
          "metrics": [
            {
              "expression": metrics,
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

  this.qs.getAnalyticsData(myReq).subscribe((report) =>{ 
    if(report && Object.keys(report).length > 0){
      console.log(report)

      this.queryResult = report.body.reports[0].data.rows;
      if(!this.isUndefined() && this.queryResult.length > 0 && this.queryResult){
        const data = this.transformAPIData(this.queryResult)
        console.log(data)
        let transformedData = data[0];
        let datesArray = data[1];

        const groupedBySource = this.groupDataBySource(transformedData);
        this.setTotalSources = Object.keys(groupedBySource).length;

        const sumedVisits = this.sortSourcesByTotalVisits(groupedBySource);

        const dataForChart = this.createDataForChart(
          datesArray,
          sumedVisits,
          groupedBySource
        );

        this.reportData.labels = dataForChart.labels;
        this.reportData.values = dataForChart.data;

        
        // this.reportData.bgColors =this.colors
    //   console.log(this.queryResult)
    //   this.setTotalUsers = report.body.reports[0].data.totals[0].values[0]
    //   // this.setTotalCountries = this.queryResult.length
      this.queryResult.forEach((row:any, id:any) => {
        //     this.reportData.labels = dataForChart.labels;
        // this.reportData.values = dataForChart.data;
         
            // this.reportData.labels.push(row.dimensions[0])
            // this.reportData.values.push(row.metrics[0].values[0])
            this.reportData.bgColors.push(this.colors[id])
         
          

        })
      }else {
        console.log('OOPS there is no analytics data stored on these specified dates')
      }
     
      
    }

    console.log(this.reportData)
    setTimeout(
      () =>{
        if(!this.isUndefined() && this.queryResult.length > 0 && this.queryResult){
          this.barChartMethod()

        }
        else {
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
