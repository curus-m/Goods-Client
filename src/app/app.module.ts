import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErogeComponent } from './eroge/eroge.component';
import { GoodsService } from './services/goods.service';
import { MakuraComponent } from './makura/makura.component';
import { TapestryComponent } from './tapestry/tapestry.component';
import { HeaderComponent } from './header/header.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Tabulator } from 'tabulator-tables';
import { AddItemComponent } from './add-item/add-item.component';
import { DakimakuraComponent } from './dakimakura/dakimakura.component';
import { UploadTestComponent } from './upload-test/upload-test.component';

@NgModule({
  declarations: [
    AppComponent,
    ErogeComponent,
    MakuraComponent,
    TapestryComponent,
    HeaderComponent,
    ItemInfoComponent,
    MainComponent,
    AddItemComponent,
    DakimakuraComponent,
    UploadTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'eroge', component: ErogeComponent },
      { path: 'dakimakura' , component: DakimakuraComponent},
      { path: 'upload' , component: UploadTestComponent}
    ])
  ],
  providers: [ GoodsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
