import { DatePipe } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class queryReportService {
 
    li:any;
    
    constructor(private http : HttpClient){
      
  }
   
   requestDimensions (dimensions:Array<any>){
    let result:any = []
    dimensions.forEach((item) => {
        console.log("       ITEM IS   ", item)
        result.push({
            name: item
        })

    });
    console.log("          RESULT IS    ", result);
    return result;
   }
    getAnalytics (dataAnalytics:Object |any){
  

          let url = `http://localhost:3002/authorizeMe`

      
        

        return this.http.post(url, dataAnalytics)
        .subscribe(Response => {
     
      
          console.log(Response)
          
          
          this.li=Response;

          if (this.li && Object.keys(this.li).length > 0){
            console.log(this.li.body.reports[0].data.rows)
          }
          
        });
    }
     
    
    getAnalyticsData(dataAnalytics:Object |any){
      let url = `http://localhost:3002/authorizeMe`

      return this.http.post<any>( url , dataAnalytics);

    }
}

