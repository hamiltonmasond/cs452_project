import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateEntryComponent } from './create-entry/create-entry.component';

export const routes: Routes = [
  { path: '', redirectTo: '/entries', pathMatch: 'full' },
  { path: 'entries', component: LandingPageComponent },
  { path: 'create-entry', component: CreateEntryComponent },
  { path: 'edit-entry/:title', component: CreateEntryComponent},
  { path: '**', redirectTo: '/entries'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }