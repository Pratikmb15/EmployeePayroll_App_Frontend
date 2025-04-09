import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { RegisterComponent } from './Components/register/register.component';


const routes: Routes = [
  {path:'Home',component:DashboardComponent},
  { path: 'Register/:id', component: RegisterComponent }, // Edit route
  { path: 'Register', component: RegisterComponent } ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
