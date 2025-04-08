import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../../Services/Employee/employees.service';
import { Console } from 'node:console';

interface Employee{
  id : number,
  name: string,
  gender: string,
  department: string,
  salary: number,
  startDate:  Date,
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
  registerForm !: FormGroup
  selectedDay: number | null = null;
  selectedMonth: string | null = null;
  selectedYear: number | null = null;

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
  constructor(private router: Router, private formbuild: FormBuilder, private employeesService: EmployeesService) { }

  ngOnInit(): void {
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
    })

    // Salary options
    for (let i = 5000; i <= 150000; i += 5000) {
      this.salaryOptions.push(i);
    }

    // Days
    for (let d = 1; d <= 31; d++) {
      this.days.push(d);
    }

    // Months
    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Years (last 50 years from now)
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 50; y--) {
      this.years.push(y);
    }
  }


  onDateChange() {
    const day = this.registerForm.value.day;
    const month = this.months.indexOf(this.registerForm.value.month) + 1; // 0-based to 1-based
    const year = this.registerForm.value.year;
  
    if (day && month && year) {
      // Format with leading zeros
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      const dateString = `${year}-${formattedMonth}-${formattedDay}`;
      
      this.registerForm.patchValue({ startDate: dateString });
    }
  }

  onSubmit() {
    console.log(this.registerForm.value);
    let reqData = {
      name: this.registerForm.value.name,
      gender: this.registerForm.value.gender,
      department: this.registerForm.value.department,
      salary: Number(this.registerForm.value.salary), 
      startDate: this.registerForm.value.startDate,
      imagePath: this.registerForm.value.imagePath,
      notes: this.registerForm.value.notes,
    }

    console.log('Final Request Data:', JSON.stringify(reqData, null, 2));
    return this.employeesService.addEmployee(reqData).subscribe({
      next: (res: any) => {
        console.log('Employee registered successfully', res);
        this.navigateToHome();

      },
      error: (err) => {
        console.error('Error registering Employees :', err);
        if (err.error) {
          console.error('Server Response:', err.error);
        }
      }
    })
  }

  
  navigateToHome() {
    this.router.navigate(['/Home']);
  }
}
