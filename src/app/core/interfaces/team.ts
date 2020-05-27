import { Player, Countries } from './player';

export class Team {
  $key: string;
  name: string;
  country: Countries;
  players: Player[]
}
