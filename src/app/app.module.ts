import { BrowserModule } from '@angular/platform-browser';
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


import {StorageService} from './service/storage/storage.service'
import {GlobalService} from './service/global/global.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterChooseComponent } from './filter-choose/filter-choose.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import {SearchComponent} from './search/search.component';
import { ProdictionResultComponent } from './prodiction-result/prodiction-result.component';


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
 
  ],
  providers: [GlobalService,
    StorageService,
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
