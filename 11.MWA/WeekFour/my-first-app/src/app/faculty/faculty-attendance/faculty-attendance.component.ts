import { Component, OnInit } from '@angular/core';
import { GameDataService } from 'src/app/student-data-service.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-faculty-attendance',
  templateUrl: './faculty-attendance.component.html',
  styleUrls: ['./faculty-attendance.component.css']
})
export class FacultyAttendanceComponent implements OnInit {
  fileName= 'ExcelSheet.xlsx';
  attendance: any;
  constructor(private studentService: GameDataService) { }


public getAllAttendance(): void{
  this.studentService.getAllAttendance().then(att => this.attendance=att)
}

exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('attendace');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  ngOnInit(): void {
    this.getAllAttendance()
  }

}
