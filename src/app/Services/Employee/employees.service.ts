import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService  {

  constructor(private httpService: HttpService) { }

  addEmployee(reqData:any){
    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json'
        })

    }
    return this.httpService.PostMethod('https://localhost:5001/api/Employee', reqData, false, header) 
  }

  getEmployees(){
    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json'
        })
    }
    return this.httpService.getService('https://localhost:5001/api/Employee',false, header);
  }

  updateEmployee(reqData:any,id:any){
    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json'   
        })
    }
    return this.httpService.PutService(`https://localhost:5001/api/Employee/${id}`,reqData,false,header); 
  }

  deleteEmployee(id:any){
    let header = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json'   
        })
    }
    return this.httpService.deleteServie(`https://localhost:5001/api/Employee/${id}`,false,header);
  }

}
