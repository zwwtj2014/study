import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { TodoComponent } from './todo/todo.component';

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
