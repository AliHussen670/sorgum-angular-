import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MicrocontrollerServiceInterface } from '../api-services/microcontroller.service';
import { SearchRequest } from '../common/app.model';
import { MicroItemDto, MicrocontrollerSearchResponse, AddMicroDto, MicroItemMinimalDto, UpdateMicroDto } from '../common/microcontroller.model';

@Injectable()
export class MicrocontrollerMockService implements MicrocontrollerServiceInterface {

  constructor() { }
  add(data: AddMicroDto): Observable<number> {
    return of(2);
  }
  update(id: number, data: UpdateMicroDto): Observable<void> {
    return of(void 0);
  }
  delete(id: number): Observable<void> {
    return of(void 0);
  }
  showMinimal(land_id: number): Observable<MicroItemMinimalDto[]> {
    const dt:MicroItemMinimalDto[]=[
      {
        Id:1,
        Name:'Rpi 1',
        Description:'faafaw',
        RegionId:1,
        RegionName:'Reg 1',
      },
      {
        Id:1,
        Description:'faafaw',
        RegionId:2,
        RegionName:'Reg 2',
        Name:'ESP 1',
      },
      {
        Id:1,
        Description:'faafaw',
        RegionId:3,
        RegionName:'Reg 3',
        Name:'ESP 2',
      },
    ];
    return of(dt);
  }
  search(data: SearchRequest, land_id?:number): Observable<MicrocontrollerSearchResponse> {
    const items: MicroItemDto[]=[
      {
        Id:1,
        LandId:1,
        LandName:'Land sorgum 1',
        Description:'faafaw',
        RegionId:1,
        RegionName:'Reg 1',
        Name:'Rpi 1',
        Status:true
      },
      {
        Id:1,
        LandId:1,
        LandName:'Land sorgum 1',
        Description:'faafaw',
        RegionId:2,
        RegionName:'Reg 2',
        Name:'ESP 1',
        Status:true
      },
      {
        Id:1,
        LandId:1,
        LandName:'Land sorgum 1',
        Description:'faafaw',
        RegionId:3,
        RegionName:'Reg 3',
        Name:'ESP 2',
        Status:false
      },
      {
        Id:1,
        LandId:1,
        LandName:'Land sorgum 1',
        Description:'faafaw',
        RegionId:3,
        RegionName:'Reg 4',
        Name:'ESP 3',
        Status:true
      }
    ];
    const res: MicrocontrollerSearchResponse={
      data:items,
      nTotal:items.length
    }
    return of(res).pipe(map(x=>{
      x.data = x.data.filter(y=>y.Name.includes(data.Search) || y.RegionName.includes(data.Search) || y.LandName.includes(data.Search));
      x.nTotal = x.data.length;
      return x;
    }));
  }
}
