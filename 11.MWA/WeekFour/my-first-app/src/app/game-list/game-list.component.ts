import { Component, OnInit } from '@angular/core';

import { GameDataService } from "../student-data-service.service";

export class Student {
  _id: string;
  firstname: string;
  lastname: String;
  studentid: Number;
  studententry: string;
};

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  constructor(private gamesDataService : GameDataService) { 
  }

  public games: Student[];

  // TS valid types
  // string, number, boolean, Array, enum, any, void
  private getGames(): void {
    this.gamesDataService.getStudents().then(foundGames => this.games= foundGames);
  }
  

  ngOnInit(): void {
    this.getGames();
  }

}
