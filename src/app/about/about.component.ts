import { Component, Inject, OnInit } from '@angular/core';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service'
import { expand, flyInOut } from '../animations/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
  flyInOut(),
  expand()
  ]
})
export class AboutComponent implements OnInit {

  constructor(private leaderService:LeaderService,@Inject ('BaseURL') private baseURL ) { }

  leaders: leader[]
  leaderErrMess: string;
  ngOnInit() {
  this.leaderService.getLeaderDetails().subscribe(leaders=> this.leaders = leaders, errmsg=>this.leaderErrMess= <any> errmsg);
  }

}
