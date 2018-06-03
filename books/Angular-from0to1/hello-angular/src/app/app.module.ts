import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { MdlModule } from '@angular-mdl/core';
import { BingImageService } from './login/bing-image.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterDialogComponent } from './login/register-dialog/register-dialog.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, // 提供了运行在浏览器中的应用所需要的关键服务和指令
    FormsModule, // 提供了表单处理和双向绑定等服务和指令
    HttpModule,
    AppRoutingModule,
    CoreModule,
    TodoModule,
    LoginModule,
    MdlModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: 'auth',
      useClass: AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
