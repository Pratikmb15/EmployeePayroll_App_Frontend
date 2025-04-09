import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../../Services/Employee/employees.service';

interface Employee{
  id:number,
  name: string,
  gender: string,
  department: string,
  salary: number,
  startDate:  Date,
  imagePath: string,
  notes: string
}



@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  searchTerm = '';
  filteredEmployees: Employee[] = [];
  Employees:Employee[]=[]

  constructor(private router: Router,private employeesService:EmployeesService){}
  ngOnInit(): void {
   this.fetchEmployees();
   
  }
  departments=['Sales', 'HR', 'Finance'];


  navigateTo() {
    this.router.navigate(['/Register']);
  }
  navigateToUpdate(id:number) {
    this.router.navigate([`/Register/${id}`]);

  }

  fetchEmployees(){
    this.employeesService.getEmployees().subscribe({ next: (res: any) => {
      console.log('Employees Fetched successfully', res);
      this.Employees=res.data;
      this.filteredEmployees=[...this.Employees];
    },
    error: (err) => {
      console.error('Error Fetching Employees :', err);

    }})
  }
  filterEmployees() {
    if (!this.searchTerm) {
      this.filteredEmployees = [...this.Employees];
      return;
    }

    const searchText = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.Employees.filter(employee => 
      employee.name.toLowerCase().includes(searchText) ||
      employee.department.toLowerCase().includes(searchText) ||
      employee.gender.toLowerCase().includes(searchText) ||
      employee.salary.toString().includes(searchText)
    );
  }
  onDelete(emp:Employee){
    console.log('id :',emp.id);
    
       const id= Number(emp.id);
    
    return this.employeesService.deleteEmployee(id).subscribe({
      next: (res:any) => {
        console.log('Employee Deleted Successfully',res);
        this.fetchEmployees();
      },
      error:(err)=> {
        console.error('Error Deleting Employee :' ,err);
        if(err.error){
          console.error('Server Response :',err.error);
        }
      }
    })
    }
}
