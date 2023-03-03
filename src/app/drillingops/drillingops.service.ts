import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DrillOp } from '../models/api-models/drillops.model';

@Injectable({
  providedIn: 'root'
})
export class DrillingopsService {

  private baseApiUrl = 'https://localhost:7254';

  drillops: DrillOp[]=[];
  
  constructor(private httpClient: HttpClient) { }

  getDrillingOps(): Observable<DrillOp[]>{
    return this.httpClient.get<DrillOp[]>(this.baseApiUrl + '/api/DrillPoints');
  } 
  
}
