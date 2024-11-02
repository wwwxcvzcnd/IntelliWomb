import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AiComponent } from './ai/ai.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'Home', component:HomeComponent},
  {path:'About', component:AboutComponent},
  {path:'AI', component:AiComponent},
  {path:'Contact', component:ContactComponent},
  {path: '', redirectTo: 'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
