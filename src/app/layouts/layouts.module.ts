import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { UiModule } from '../shared/ui/ui.module';
import { LayoutComponent } from './layout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [LayoutComponent, TopbarComponent, FooterComponent, RightsidebarComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    NgbCollapseModule,
    ClickOutsideModule,
    UiModule,
    ToastModule

  ]
})
export class LayoutsModule { }
