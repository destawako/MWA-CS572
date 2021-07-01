import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from 'src/app/student-data-service.service';

@Component({
  selector: 'app-students-add-course',
  templateUrl: './students-add-course.component.html',
  styleUrls: ['./students-add-course.component.css']
})
export class StudentsAddCourseComponent implements OnInit {

  constructor(private studentService: GameDataService, private route: ActivatedRoute) { }

  id: Number = 0;
  public course: any;

  public getOneCourse(id:Number){
    this.studentService.getOneCourseById(id).then(foundedCourse => this.course=foundedCourse)
  }

  public addOneCourse(course): void{
    this.studentService.addOneCourse(course);
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data.id;
    })
    this.getOneCourse(this.id);
    this.addOneCourse(this.course)
  }

}
