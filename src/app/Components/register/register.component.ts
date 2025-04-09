import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../../Services/Employee/employees.service';
import { MatSnackBar } from '@angular/material/snack-bar';



interface Employee {
  id: number,
  name: string,
  gender: string,
  department: string,
  salary: number,
  startDate: Date,
  imagePath: string,
  notes: string
}

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;
  employeeData!: Employee;

  // Existing arrays and configurations remain the same
  salaryOptions: number[] = [];
  days: number[] = [];
  months: string[] = [];
  years: number[] = [];
  profileImages: string[] = [
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/46.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/men/52.jpg'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formbuild: FormBuilder,
    private employeesService: EmployeesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeDropdowns();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.registerForm = this.formbuild.group({
      name: [''],
      gender: [''],
      department: [''],
      salary: [null],
      startDate: [null],
      imagePath: [''],
      notes: [''],
      day: [''],
      month: [''],
      year: ['']
    });
  }

  private initializeDropdowns(): void {
    // Existing initialization code remains the same
    for (let i = 5000; i <= 150000; i += 5000) this.salaryOptions.push(i);
    for (let d = 1; d <= 31; d++) this.days.push(d);
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 50; y--) this.years.push(y);
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployeeData();
    }
  }

  private loadEmployeeData(): void {
    this.employeesService.getEmployeeById(this.employeeId).subscribe({
      next: (res: any) => {
        this.employeeData = res.data;
        this.populateForm();
      },
      error: (err) => {
        console.error('Error fetching employee data:', err);
      }
    });
  }

  populateForm(): void {
    if (!this.employeeData) return;

    // Parse the startDate to get day, month, year
    const startDate = new Date(this.employeeData.startDate);
    const day = startDate.getDate();
    const month = this.months[startDate.getMonth()];
    const year = startDate.getFullYear();

    // Set form values
    this.registerForm.patchValue({
      name: this.employeeData.name,
      gender: this.employeeData.gender,
      department: this.employeeData.department,
      salary: this.employeeData.salary,
      imagePath: this.employeeData.imagePath,
      notes: this.employeeData.notes,
      day: day,
      month: month,
      year: year,
      startDate: this.employeeData.startDate
    });
  }

  onDateChange() {
    // Existing date handling remains the same
    const day = this.registerForm.value.day;
    const month = this.months.indexOf(this.registerForm.value.month) + 1;
    const year = this.registerForm.value.year;

    if (day && month && year) {
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      this.registerForm.patchValue({ startDate: `${year}-${formattedMonth}-${formattedDay}` });
    }
  }

  onSubmit() {
  
  
    const reqData = {

      name: this.registerForm.value.name,
      gender: this.registerForm.value.gender,
      department: this.registerForm.value.department,
      salary: Number(this.registerForm.value.salary),
      startDate: this.registerForm.value.startDate,
      imagePath: this.registerForm.value.imagePath,
      notes: this.registerForm.value.notes,
    }
    let id = this.employeeId;
    id = Number(id);
    if(this.isEditMode) {
      this.employeesService.updateEmployee(reqData, id).subscribe({
        next: (res: any) => {
          console.log('Employee updated successfully', res);
          this.snackBar.open('Employee updated successfully', 'Close', { duration: 3000 });
          this.navigateToHome();
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          this.snackBar.open('Failed Updating Employee ', 'Close', { duration: 3000 });
          if (err.error) {
            console.error('Server Response:', err.error);
          }
        }
      });
    } else {
    this.employeesService.addEmployee(reqData).subscribe({
      next: (res: any) => {
        console.log('Employee registered successfully', res);
        this.snackBar.open('Employee registered successfully', 'Close', { duration: 3000 });
        this.navigateToHome();
  
      },
      error: (err) => {
        console.error('Error registering Employees :', err);
        this.snackBar.open('Failed registering Employee ', 'Close', { duration: 3000 });
        if (err.error) {
          console.error('Server Response:', err.error);
        }
      }
    });
  };

 
}
navigateToHome() {
  this.router.navigate(['/Home']);
}
  }


