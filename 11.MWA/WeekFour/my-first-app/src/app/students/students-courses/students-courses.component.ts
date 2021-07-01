import { Component, OnInit } from '@angular/core';
import { GameDataService } from 'src/app/student-data-service.service';

export class Course {
  _id: string;
  coursename: string;
  coursecode: String;
  
};

@Component({
  selector: 'app-students-courses',
  templateUrl: './students-courses.component.html',
  styleUrls: ['./students-courses.component.css']
})
export class StudentsCoursesComponent implements OnInit {

  id: Number = 0;
  constructor(private studentsService: GameDataService) { }


  public course : Course[];
  public getAllCourses(): void{
    this.studentsService.getAllCourses().then(foundCourses => this.course=foundCourses);
  }

  ngOnInit(): void {
    this.getAllCourses()
  }

}
