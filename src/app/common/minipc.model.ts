import { SearchResponse } from './app.model';

export class MiniPcItemMinimalDto{
  Id!:number;
  Name!:string;
  Description!:string;
  RegionId!:number;
  RegionName!:string;
}

export class MiniPcItemDto{
  Id!:number;
  Name!:string;
  Description!:string;
  MiniPcCode!:string;
  MiniPcSecret!:string;
  RegionId!:number;
  RegionName!:string;
  LandId!:number;
  LandName!:string;
  PlantId!:number;
  PlantName!:string;
  Status!:boolean;
}

export class MiniPcSearchResponse extends SearchResponse<MiniPcItemDto>{}

export class AddMiniPcDto{
  Name!:string;
  Description!:string;
  Code!:string;
  Secret!:string;
  RegionId!:number;
}

export class UpdateMiniPcDto{
  Name!:string;
  Description!:string;
  MiniPcCode!:string;
  MiniPcSecret!:string;
  RegionId!:number;
}

export class MiniPcsIdentity{
  Ids!:number[];
}

export class MiniPcItem2DTO{
  Id!:number;
  Name!:string;
  RegionId!:number;
  RegionName!:string;
  Description!:string;
  LandId!:number;
  LandName!:string;
  Status!:boolean;
  PlantId!:number;
  PlantName!:string;
}
