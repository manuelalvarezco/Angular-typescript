import { Component, OnInit } from '@angular/core';
import { TeamService } from '../core/services/team.service';
import { Observable } from 'rxjs';
import { Team } from '../core/interfaces/team';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {

  public teams$: Observable<Team[]>;

  constructor(private teamServide: TeamService) { }

  ngOnInit() {

    this.teams$ = this.teamServide.getTeams();
  }

}
