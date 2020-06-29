import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListsiteComponent} from './components/sites/listsite/listsite.component';
import {DetailsiteComponent} from './components/sites/detailsite/detailsite.component';
import {CreersiteComponent} from './components/sites/creersite/creersite.component';
import { HeaderComponent } from './shared/header/header.component';


const routes: Routes = [
  {
    path: '',   redirectTo: '/sitelist', pathMatch: 'full'
  },
  {
    path: "sitelist",
    component: ListsiteComponent
  },
  {
    path: 'sitedetail',
    component:  DetailsiteComponent
  },
  {
    path: 'sitecreer',
    component: CreersiteComponent
  }
  ,
  {
    path: 'apropos',
    component: HeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
