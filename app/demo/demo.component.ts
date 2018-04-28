import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AlertService, UserService } from '../_services/index';
 
@Component({
  selector: 'bar-chart-demo',
  templateUrl: 'app/demo/demo.component.html',
  providers: [DatePipe],
})
export class DemoComponent implements OnInit {

  private charStartDate: string;
  private charEndDate: string;
  private charType: string;
  private charTypeOptions: string[] = ['intra-day', 'days', 'months'];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public userId: number;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'line';// type of chart
  public barChartLegend:boolean = true;
  public barColors:any[] = [
    {backgroundColor:'#3fb8ff'},
    {backgroundColor:'#00bc4b'}
];

  public barChartData:any[] = [];
  
  //default values
  ngOnInit(){ 
    this.charStartDate = '2018-04-01';
    this.charEndDate = this.datePipe.transform(Date.now(),'yyyy-MM-dd');
    this.charType = 'intra-day';//Usagetype can be intra-day, days or months
    this.userId = Number.parseInt(this.route.snapshot.paramMap.get('userId')) || 23;

    this.updateChart();
  }

  public doSomething():void{

    if(this.charStartDate != ""){
      
      this.barChartLabels = [];
      this.barChartData = [];
      
      this.updateChart();
    }
  }

  public updateChart():void{

    this.userService.getUsage(this.userId, this.charStartDate, this.charEndDate, this.charType).subscribe(
      response => { 
          var arr = response['readings'];
          if (arr != null) {

            var tempData: any[] = [];
            var tempLabels: string[] = [];
            var tempObj: any = {"data": [], "label": ""};
            tempObj.label = "kwh";

            var newArr = arr.forEach((item: any) => {
              tempData.push(item.kwh);
              if(this.charType == 'intra-day'){
                tempLabels.push(this.datePipe.transform(item.start,'HH:mm'));
              } else if(this.charType == 'days'){
                tempLabels.push(this.datePipe.transform(item.start,'MM/dd/yyyy'));
              } else {
                tempLabels.push(item.start);
              }
            });

            tempObj.data = tempData;
            
            this.barChartLabels = tempLabels;
            this.barChartData.push(tempObj);
          }else {
            this.alertService.error('No data found for given criteria');
          }
      }
    );
  }  

  getDetails() {
    this.router.navigate(['/account/details', this.userId]);
  }
}