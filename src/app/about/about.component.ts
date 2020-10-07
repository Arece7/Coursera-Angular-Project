import { Component, OnInit } from '@angular/core';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private leaderService:LeaderService) { }
 
  leaders: leader[]
  ngOnInit() {
    this.leaders = this.leaderService.getLeaderDetails();
  }

}
