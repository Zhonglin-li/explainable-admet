import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {HomeComponent} from './home/home.component';
import {FilterChooseComponent} from './filter-choose/filter-choose.component';
import {SearchComponent} from './search/search.component';
import { ProdictionResultComponent } from './prodiction-result/prodiction-result.component';
import {OptimizeComponent} from './optimize/optimize.component';
import { SearchResultComponent } from './search-result/search-result.component';
import {ModelsDocsComponent} from './models-docs/models-docs.component';
import {ContactComponent} from './contact/contact.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RangeResultComponent} from './range-result/range-result.component';
import {OptimizeResultComponent} from './optimize-result/optimize-result.component';
// import { SearchComponent } from './view/search/search.component';
// import {IndexComponent} from './view/index/index.component';
// import {SearchComponent} from './view/search/search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admetgcn/home',
    pathMatch: 'full'
  },
  {
    path: 'admetgcn',
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
        path: 'optimize',
        component: OptimizeComponent
      },
      {
        path: 'prediction/result',
        // path: 'prediction/result/:index'配置动态路由
        component: ProdictionResultComponent
      },
      {
        path: 'optimize/result',
        // path: 'prediction/result/:index'配置动态路由
        component: OptimizeResultComponent
      },
      {
        path: 'search/propertyResult',
        // path: 'prediction/result/:index'配置动态路由
        component: SearchResultComponent
      },
      {
        path: 'search/rangeResult',
        // path: 'prediction/result/:index'配置动态路由
        component: RangeResultComponent
      },
      {
        path: 'models',
        component: ModelsDocsComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: '**',
         component: NotFoundComponent
      },
    ]
  },

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
