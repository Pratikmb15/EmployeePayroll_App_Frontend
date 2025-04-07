import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router){}
  departments=['Sales', 'HR', 'Finance'];
  employees = [
    {
      name: 'Amarpa Shashanka Keerthi Kumar',
      gender: 'Female',
      departments: ['Sales', 'HR', 'Finance'],
      salary: 10000,
      startDate: new Date('2019-10-29'),
      imagePath: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Mohammad Salman Iqbal Shaikh',
      gender: 'Female',
      departments: ['Sales', 'HR', 'Finance'],
      salary: 10000,
      startDate: new Date('2019-10-29'),
      imagePath: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  ];

  navigateTo() {
    this.router.navigate(['/Register']);
  }
}
