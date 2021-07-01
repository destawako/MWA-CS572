import { Component, OnInit } from '@angular/core';
import { GameDataService } from "../../student-data-service.service";


export class Student {
  _id: string;
  firstname: string;
  lastname: String;
  studentid: Number;
  studententry: string;
};

@Component({
  selector: 'app-faculty-homepage',
  templateUrl: './faculty-homepage.component.html',
  styleUrls: ['./faculty-homepage.component.css']
})
export class FacultyHomepageComponent implements OnInit {

  constructor(private gamesDataService : GameDataService) { }

  public games: Student[];

  // TS valid types
  // string, number, boolean, Array, enum, any, void
  private getStudents(): void {
    this.gamesDataService.getStudents().then(foundGames => this.games= foundGames);
  }
  

  ngOnInit(): void {
    this.getStudents();
  }

}
