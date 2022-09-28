import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVertificationComponent } from './pages/email-vertification/email-vertification.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'emailVertification',component:EmailVertificationComponent},
  {path:'**',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
