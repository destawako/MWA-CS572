import { Component, OnInit } from '@angular/core';
import { GameDataService } from "../../student-data-service.service"
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


// export class Student {
//   // _id: string;
//   firstname: string;
//   lastname: String;
//   studentid: Number;
//   studententry: string;
//   password:String;
//   confirmpassword: String;
//   email:String;
//   img:String
// };
@Component({
  selector: 'app-students-update-profile',
  templateUrl: './students-update-profile.component.html',
  styleUrls: ['./students-update-profile.component.css']
})
export class StudentsUpdateProfileComponent implements OnInit {

  id: Number;
  public students: any;


  constructor(private gamesDataService : GameDataService, private route : ActivatedRoute) { }

  public updateOneStudent(form: NgForm): void {

    let student: any = {
      firstname : form.value.firstname,
      lastname : form.value.lastname,
      email : form.value.email,
      confirmpassword: form.value.confirmpassword,
      password: form.value.password,
      img : form.value.img
    }

    this.gamesDataService.updateOneStudent(this.id, student)
    
      }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data.id;
      this.gamesDataService.getOneStudent(this.id).then(foundStudent => this.students=foundStudent)
    })
  }

}
