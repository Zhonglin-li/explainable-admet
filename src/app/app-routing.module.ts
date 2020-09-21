import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {HomeComponent} from './home/home.component';
import {FilterChooseComponent} from './filter-choose/filter-choose.component';
import {SearchComponent} from './search/search.component';
import { ProdictionResultComponent } from './prodiction-result/prodiction-result.component';
// import { SearchComponent } from './view/search/search.component';
// import {IndexComponent} from './view/index/index.component';
// import {SearchComponent} from './view/search/search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admet/home',
    pathMatch: 'full'
  },
  {
    path: 'admet',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'prediction',
        component: FilterChooseComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'prediction/result',
        component: ProdictionResultComponent
      },
    ]
  },
  // {
  //   path: "",
  //   component: IndexComponent
  // },
  // {
  //   path:"search",
  //   component:SearchComponent
  // }
];
/* const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
]; */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
