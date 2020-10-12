import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,  private processHTTPMsgService: ProcessHTTPMsgService) { }

getLeaderDetails(): Observable<leader[]>{
  return this.http.get<leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
}
getFeaturedLeaderDetails():Observable <leader>
{
  return this.http.get<leader>(baseURL + 'leadership?featured=true').pipe(map(leader=>leader[0])).pipe(catchError(this.processHTTPMsgService.handleError));
}
}
