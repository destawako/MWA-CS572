import { Component, OnInit } from '@angular/core';

import { GameDataService } from "../student-data-service.service"

import { ActivatedRoute } from '@angular/router';

export class Student {
  _id: string;
  firstname: string;
  lastname: String;
  studentid: Number;
  studententry: string;
};

@Component({
  selector: 'app-games-get-one',
  templateUrl: './games-get-one.component.html',
  styleUrls: ['./games-get-one.component.css']
})
export class GamesGetOneComponent implements OnInit {
 
  id:Number = 0;
  constructor(private gameDataService : GameDataService, private route: ActivatedRoute) { }
  
  public student: any;

  url = "./assets/images/Thomas-Cameron_Student_Profile.jpg"
  // TS valid types
  // string, number, boolean, Array, enum, any, void
  public getOneStudent(id: Number): void {
    this.gameDataService.getOneStudent(id).then(foundGame => this.student=foundGame);
    // console.log(this.student.firstname + "body---------")
  }

  

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data.id;
    })
    this.getOneStudent(this.id)
  }

}
