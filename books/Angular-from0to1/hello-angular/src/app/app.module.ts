import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { routing } from './app.routes';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo/todo.service';
import { InMemoryTodoDbService } from './todo/todo-data';
import { TodoFooterComponent } from './todo/todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo/todo-header/todo-header.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, TodoComponent, TodoFooterComponent, TodoHeaderComponent],
  imports: [
    BrowserModule, // 提供了运行在浏览器中的应用所需要的关键服务和指令
    FormsModule, // 提供了表单处理和双向绑定等服务和指令
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryTodoDbService),
    routing
  ],
  providers: [
    TodoService,
    {
      provide: 'auth',
      useClass: AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
