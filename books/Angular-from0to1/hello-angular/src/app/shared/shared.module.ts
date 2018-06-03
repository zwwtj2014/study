import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, MdlModule],
  exports: [CommonModule, FormsModule, MdlModule]
})
export class SharedModule {}
