import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AlertService, UserService } from '../_services/index';

@Component({
    templateUrl: 'app/usage/usage.component.html',
    providers: [DatePipe]
})
export class UsageComponent implements OnInit {

    private data: any[] = [];
    public userId: number;
    
    public columnChartData: any =  {
        chartType: 'ColumnChart',
        dataTable: [
            ["start - end","kwh"]
    ],
        options: {
          title: 'Usage',
          animation:{
            duration: 1000,
            easing: 'out',
            startup: true,
          },
          colors: ['#3fb8ff', '#00bc4b'],
        }
      };

    constructor (
        private userService: UserService,
        private alertService: AlertService,
        private datePipe: DatePipe,
        private route: ActivatedRoute) { }

 
    ngOnInit(){ 
        this.userId = Number.parseInt(this.route.snapshot.paramMap.get('userId'));
        this.userService.getUsage(this.userId,'','','').subscribe(
            response => { 
                var arr = response['readings'];
                
                this.columnChartData = Object.create(this.columnChartData);
                var newArr = arr.forEach((item: any) => {
                    var temp : Array<any> = [
                        this.datePipe.transform(item.start,'MM/dd/yyyy HH:mm') + " - " + this.datePipe.transform(item.end,'HH:mm'), 
                        item.kwh];
                    console.log(temp);
                    this.columnChartData.dataTable.push(temp);
                });
            }
        );
    }

}