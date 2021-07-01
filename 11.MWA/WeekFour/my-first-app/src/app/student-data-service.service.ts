import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Student } from "./game-list/game-list.component";
import { Course } from './students/students-courses/students-courses.component';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }

  // 1 Build URL
  private apiBaseUrl= "http://localhost:8080";


  public getStudents():Promise<Student[]> {
    const url:string= this.apiBaseUrl+"/attendance/students/get-all-students";
    return this.http  // 5 return the response
            .get(url)  // 2 Tell http service to make the request
            .toPromise() // 3 convert Observable to Promise
            .then(response => response as Student[]) // 4 Convert to JSON
            .catch(this.handleErrors); // 6 Catch errors
  }

  public getOneStudent(id: Number): Promise<Student[]>{
    const url:string= this.apiBaseUrl+"/students/getall/" +id;
    return this.http
               .get(url)
               .toPromise()
               .then(response => response as Student[])
               .catch(this.handleErrors);
  }

  public addOneStudent(student): Promise<Student[]>{
    const url:string= this.apiBaseUrl+"/attendance/students/register";
    return this.http
               .post(url, student)
               .toPromise()
               .then(response => response as Student[])
               .catch(this.handleErrors);
  }

  public updateOneStudent(id:Number, student): Promise<Student[]>{
    const url:string= this.apiBaseUrl+"/attendance/students/"+ id;
    return this.http
               .put(url,student)
               .toPromise()
               .then(response => response as Student[])
               .catch(this.handleErrors);
  }

  public deleteOneStudent(id:Number): Promise<Student[]>{
    const url:string= this.apiBaseUrl+"/attendance/students/"+ id;
    return this.http
               .delete(url)
               .toPromise()
               .then(response => response as Student[])
               .catch(this.handleErrors);
  }

  public getAllCourses(): Promise<Course[]>{
    const url:string = this.apiBaseUrl+"/students/courses"
    return this.http
               .get(url)
               .toPromise()
               .then(response => response as Course[])
               .catch(this.handleErrors)
  }

  public addOneCourse(course): Promise<Course[]>{
    const url:string= this.apiBaseUrl+"/students/courses";
    return this.http
               .post(url, course)
               .toPromise()
               .then(response => response as Course[])
               .catch(this.handleErrors);
  }

  public getOneCourseById(id: Number): Promise<Student[]>{
    const url:string= this.apiBaseUrl+"/students/courses/" +id;
    return this.http
               .get(url)
               .toPromise()
               .then(response => response as Student[])
               .catch(this.handleErrors);
  }

  public getAllAttendance():Promise<Student[]> {
    const url:string= this.apiBaseUrl+"/students/attendance";
    return this.http  // 5 return the response
            .get(url)  // 2 Tell http service to make the request
            .toPromise() // 3 convert Observable to Promise
            .then(response => response as Student[]) // 4 Convert to JSON
            .catch(this.handleErrors); // 6 Catch errors
  }
  
  public getOneAttendance(id: Number): Promise<Student[]>{
    const url:string= this.apiBaseUrl+"/students/getall/" +id;
    return this.http
               .get(url)
               .toPromise()
               .then(response => response as Student[])
               .catch(this.handleErrors);
  }
  
  

  

  private handleErrors(error: any):Promise<any> {
    console.log("Something went wrong ", error);
    return Promise.reject(error.message || error);
  }
}
