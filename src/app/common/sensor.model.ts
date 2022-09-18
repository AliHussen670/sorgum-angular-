import { SearchResponse } from './app.model';

export class SensorType{
    Id!:number;
    Name!:string;
}

export class SensorItemDto{
    Id!:number;
    Name!:string;
    Description!:string;
    MicroId!:number;
    MicroName!:string;
    RegionId!:number;
    RegionName!:string;
    LandId!:number;
    LandName!:string;
    Type!:number;
}

export class SensorSearchResponse extends SearchResponse<SensorItemDto>{}

export class AddSensorDto{
    Name!:string;
    Description!:string;
    MicroId!:number;
    Type!:number;
}
export class UpdateSensorDto{
    Name!:string;
    Description!:string;
    MicroId!:number;
    Type!:number;
}
