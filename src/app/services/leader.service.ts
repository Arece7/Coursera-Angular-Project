import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

getLeaderDetails(): Promise <leader[]>{
 return new Promise(resolve=>{
   // Simulate server latency with 2 second delay
   setTimeout(() => resolve(LEADERS) ,2000);
 });
}
getFeaturedLeaderDetails():Promise <leader>
{
  return new Promise(resolve=>{
    // Simulate server latency with 2 second delay
    setTimeout(() => resolve(LEADERS.filter((leader)=> leader.featured)[0]), 2000);
  });
}
}
