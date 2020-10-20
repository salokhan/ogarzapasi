import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from './ui/ui.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { DialPadModule } from './dial-pad/dial-pad.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiModule,
    DynamicFormModule,
    DialPadModule
    ]
})
export class SharedModule { }
