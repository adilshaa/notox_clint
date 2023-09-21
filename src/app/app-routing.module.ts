import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FullNoteComponent } from './components/full-note/full-note.component';
import { AuthGuard } from './core/auth/guard.guard';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    // canActivate: [AuthGuard], // Use the guard here
  },
  {
    path: 'signin',
    component: LoginComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    // canActivate: [AuthGuard], // Use the guard here
  },
  {
    path: 'notepage',
    component: FullNoteComponent,
    // canActivate: [AuthGuard], // Use the guard here
  },
  {
    path: '**',
    component: NotesComponent,
    // canActivate: [AuthGuard], // Use the guard here
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
