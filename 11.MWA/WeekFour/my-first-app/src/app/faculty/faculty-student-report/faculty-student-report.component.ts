import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from 'src/app/student-data-service.service';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-faculty-student-report',
  templateUrl: './faculty-student-report.component.html',
  styleUrls: ['./faculty-student-report.component.css']
})
export class FacultyStudentReportComponent implements OnInit {

  fileName= 'ExcelSheet.xlsx';
  public attendance: any;
  id: Number = 0 ;

  constructor(private studentService: GameDataService, private route: ActivatedRoute) { }
  public getOneAttendance(id: Number): void {
    this.studentService.getOneAttendance(id).then(attendaceFound => this.attendance=attendaceFound);
    // console.log(this.student.firstname + "body---------")

  }
    exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('attendance');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data.id;
    })
    this.getOneAttendance(this.id)
  }


}
