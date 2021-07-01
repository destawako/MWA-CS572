import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from 'src/app/student-data-service.service';
import { Student } from 'src/app/game-list/game-list.component';


export class Course {
  _id: string;
  coursename: string;
  coursecode: String;
  
};

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.css']
})
export class StudentsPageComponent implements OnInit {


id: Number = 1;
constructor(private gameDataService : GameDataService, private route: ActivatedRoute) { }
  
  public students: any;

  url = "./assets/images/Thomas-Cameron_Student_Profile.jpg"

  public getOneStudent(id: Number): void {
    this.gameDataService.getOneStudent(id).then(foundGame => this.students=foundGame);
  }

  

  ngOnInit(): void {
    // this.route.params.subscribe(data => {
    //   this.id = data.id;
    // })
    this.getOneStudent(this.id)
  }
}
