import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

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
  constructor(private router: Router){}
  
  ngOnInit(): void {
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
  
  navigateToHome() {
    this.router.navigate(['/Home']);
  }
}
