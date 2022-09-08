import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { GreenHouseService } from 'src/app/api-services/green-house.service';
import { GreenHouseGraphParameterDto, GreenHouseGraphParameterDtoWithLocal, GreenHouseParameterOptionDto } from 'src/app/common/greenhouse.model';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {
  isLoading=false;
  linkDashboard = "";
  form = this.fb.group({
    GreenhouseId:[null, Validators.required],
    ChosenDate:[null, Validators.required],
    ChosenParameterIds:[null, Validators.required]
  });
  listOfParams:GreenHouseParameterOptionDto[]=[];
  chartOptions:{[key:string]:any}={
    // 'SpH':{init:undefined,merged:undefined},
    // 'AT':{init:undefined,merged:undefined},
    // 'AM':{init:undefined,merged:undefined},
    // 'ST':{init:undefined,merged:undefined},
    // 'SM':{init:undefined,merged:undefined},
    // 'lgI':{init:undefined,merged:undefined},
    // 'N':{init:undefined,merged:undefined},
    // 'P':{init:undefined,merged:undefined},
    // 'K':{init:undefined,merged:undefined},
  };
  chartData:{[key:string]:any}={
    // 'SpH':[],
    // 'AT':[],
    // 'AM':[],
    // 'ST':[],
    // 'SM':[],
    // 'lgI':[],
    // 'N':[],
    // 'P':[],
    // 'K':[],
  }
  constructor(
    private greenhouseService: GreenHouseService,
    private fb: UntypedFormBuilder,
    private currentGhService:CurrentGreenHouseService
  ) { }

  ngOnInit(): void {
    this.form.controls.GreenhouseId.setValue(this.currentGhService.getId())
    this.greenhouseService.getAllParameters().subscribe(x=>{
      this.listOfParams = x
    });
    this.linkDashboard = "/dashboard/"+this.currentGhService.chosedGreenHouse.value;
  }
  submitForm():void{
    this.isLoading=true;
    this.greenhouseService.getGraphParamater(this.form.value)
        .subscribe(x=>{this.setChart(x);this.isLoading=false;}, err=>this.isLoading=false);
  }
  resetChart():void{
    this.chartOptions={};
    this.chartData={};
  }
  setChart(data:GreenHouseGraphParameterDto[]):void{
    
    this.resetChart();
    const chosenParam = this.form.controls.ChosenParameterIds.value;
    
    for (let index = 0; index < chosenParam.length; index++) {
      const element = chosenParam[index];
      
      const opt = this.listOfParams.find(x=>x.value===element);

      this.supplyChartData(opt!!,data);
      this.supplyChart(opt!!);
      
    }
  }
  supplyChartData(param:GreenHouseParameterOptionDto, data:GreenHouseGraphParameterDto[]){
    const p = data.filter(x=>x.parameterId===param.value).map(x=>{
      const nd = new Date(Date.parse(x.createdAt.toString()));
      const local_nd = new Date((nd).setHours(nd.getHours()+7));
      const local_ndTS = [local_nd.getFullYear(), local_nd.getMonth() + 1, local_nd.getDate()].join('/')+' '+[local_nd.getHours(),local_nd.getMinutes(),local_nd.getSeconds()].join(':')
      const r= new GreenHouseGraphParameterDtoWithLocal();
      r.name=local_ndTS;
      r.value=[local_ndTS, x.value];
      return r;
    });
    this.chartData[param.value]=p;
  }

  supplyChart(data:GreenHouseParameterOptionDto):void{
    this.chartOptions[data.value]={init:undefined, merged:undefined};
    this.chartOptions[data.value].init = {
      title: {
        text: data.display
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params:any) => {
          params = params[0];
          return params.name + ' = ' + params.value[1];

          // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' - ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() + ' = ' + params.data[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        // hoverAnimation: false,
        data: this.chartData[data.value]
      }]
    };
  }
}
