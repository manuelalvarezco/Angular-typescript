import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database/database';
import { Player } from '../interfaces/player';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playerDB: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playerDB = this.db.list('/players', ref => ref.orderByChild('name'));
  }

  getPlayers(): Observable<Player[]> {
    return this.playerDB.snapshotChanges().pipe(
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

  addPlayer(player: Player){
    return this.playerDB.push(player);
  }

  deletePlayer(id: string){
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayerData){
    const $key = newPlayerData.$key;
    delete(newPlayerData.$key);
    this.db.list('/players').update($key, newPlayerData);
  }
}
