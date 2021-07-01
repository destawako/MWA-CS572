import { Component, OnInit } from '@angular/core';
import { GameDataService } from "../../student-data-service.service";
import { NgForm }   from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export class Student {
  // _id: string;
  firstname: string;
  lastname: String;
  email: String;
  password: String;
  confirmpassword: String;
  img: String;
};

@Component({
  selector: 'app-students-register',
  templateUrl: './students-register.component.html',
  styleUrls: ['./students-register.component.css']
})
export class StudentsRegisterComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private gamesDataService : GameDataService) { }

  url = "./assets/images/Thomas-Cameron_Student_Profile.jpg"
  onSelectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  ngOnInit(): void {
    // this.addOneStudent(student)
  }



  // public games: Game[];

  // TS valid types
  // string, number, boolean, Array, enum, any, void
  addOneStudent(form){

   let student : Student = {
      // _id : ,
      firstname : form.value.firstname,
      lastname : form.value.lastname,
      email : form.value.email,
      confirmpassword: form.value.confirmpassword,
      password: form.value.password,
      img: form.value.img
    }
    this.gamesDataService.addOneStudent(student);
    this.router.navigateByUrl('/login');
  }

  
}
