import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestHomeComponent } from './test-home/test-home.component';


@NgModule({
  declarations: [TestHomeComponent],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
