import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ServiceProviderProfileComponent } from './service-provider-profile/service-provider-profile.component';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/core/helpers/error.interceptor';
import { ServicesListComponent } from './services-list/services-list.component';
import { AddUpdateServicesComponent } from './add-update-services/add-update-services.component';
import {TableModule} from 'primeng/table';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { AddUpdateCountryComponent } from './add-update-country/add-update-country.component';
import { StatesListComponent } from './states-list/states-list.component';
import { AddUpdateStatesComponent } from './add-update-states/add-update-states.component';
import { CitiesListComponent } from './cities-list/cities-list.component';
import { AddUpdateCityComponent } from './add-update-city/add-update-city.component';

@NgModule({
  declarations: [ServiceProviderProfileComponent, ServicesListComponent, AddUpdateServicesComponent, CountriesListComponent, AddUpdateCountryComponent, StatesListComponent, AddUpdateStatesComponent, CitiesListComponent, AddUpdateCityComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UiModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AdminModule { }
