import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database/database';
import { Team } from '../interfaces/team';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

export const TeamsTableHeaders = ['name', 'country', 'players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsDB: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamsDB = this.db.list('/teams', ref => ref.orderByChild('name'));
   }

   getTeams(): Observable<Team[]> {
    return this.teamsDB.snapshotChanges().pipe(
      map(
        changes => {
          return changes.map((c: any) => ({
            $key: c.payload.key,
            ...c.payload.val()
          }));
        }
      )
    );
  }

  addTeam(team: Team){
    return this.teamsDB.push(team);
  }

  deleteTeam(id: string){
    this.db.list('/teams').remove(id);
  }

  editTeam(newTeamData){
    const $key = newTeamData.$key;
    delete(newTeamData.$key);
    this.db.list('/players').update($key, newTeamData);
  }
}
