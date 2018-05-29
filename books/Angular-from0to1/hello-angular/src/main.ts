import { enableProdMode } from '@angular/core';

// platformBrowserDynamic: 连同Angular编译器一起发布到浏览器
// platformBrowser: 不带编译器到浏览器
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Angular编译器在浏览器中编译并引导该引用
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
