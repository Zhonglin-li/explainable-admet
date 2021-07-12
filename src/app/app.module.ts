import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
// import { IconsProviderModule } from './icons-provider.module';
// import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
// import { IndexComponent } from './view/index/index.component';
// import { SearchComponent } from './search/search.component';
// import { JsmeModule} from './view/jsme/jsme.module';
import { JsmeComponent } from '../app/jsme/jsme/jsme.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FileUploadModule } from 'ng2-file-upload';
import {DataTablesModule} from 'angular-datatables';
// import {ElModule} from 'element-angular';
import * as bootstrap from 'bootstrap';
import * as $ from 'jquery';
import {NzSelectModule} from 'ng-zorro-antd/select';


import {StorageService} from './service/storage/storage.service';
import {GlobalService} from './service/global/global.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterChooseComponent } from './filter-choose/filter-choose.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import {SearchComponent} from './search/search.component';
import { ProdictionResultComponent } from './prodiction-result/prodiction-result.component';
import { ModelsDocsComponent } from './models-docs/models-docs.component';
import { NavbuttonComponent } from './navbutton/navbutton.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RangeResultComponent } from './range-result/range-result.component';
import { OptimizeComponent } from './optimize/optimize.component';
import { OptimizeResultComponent } from './optimize-result/optimize-result.component';
import { HelpComponent } from './help/help.component';
import { SimilarityResultComponent } from './similarity-result/similarity-result.component';



@NgModule({
  declarations: [
    AppComponent,
    // IndexComponent,
    SearchComponent,
    JsmeComponent,
    NavbarComponent,
    FilterChooseComponent,
    LayoutComponent,
    HomeComponent,
    ProdictionResultComponent,
    ModelsDocsComponent,
    NavbuttonComponent,
    SearchResultComponent,
    ContactComponent,
    NotFoundComponent,
    RangeResultComponent,
    OptimizeComponent,
    OptimizeResultComponent,
    HelpComponent,
    SimilarityResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // IconsProviderModule,
    // NzLayoutModule,
    // NzMenuModule,
    NzButtonModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    DataTablesModule,
    CommonModule,
    NzSelectModule,
    BrowserAnimationsModule,

    // ElModule.forRoot(),
  ],
  providers: [GlobalService,
    StorageService,
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
