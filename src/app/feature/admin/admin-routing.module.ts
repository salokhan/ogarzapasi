import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesListComponent } from './cities-list/cities-list.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { ServiceProviderProfileComponent } from './service-provider-profile/service-provider-profile.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { StatesListComponent } from './states-list/states-list.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  {
    path: 'spProfile',
    component: ServiceProviderProfileComponent
  },
  {
    path: 'services',
    component: ServicesListComponent
  },
  {
    path: 'countries',
    component: CountriesListComponent
  },
  {
    path: 'states',
    component: StatesListComponent
  },
  {
    path: 'cities',
    component: CitiesListComponent
  },
  {
    path: 'tags',
    component: TagsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
