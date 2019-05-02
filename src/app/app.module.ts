import { FormsModule } from '@angular/forms'; 
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
import { TabulatorTableComponent } from './tabulator-table/tabulator-table.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ErogeComponent,
    MakuraComponent,
    TapestryComponent,
    HeaderComponent,
    TabulatorTableComponent,
    ItemInfoComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'eroge', component: ErogeComponent },
    ])
  ],
  providers: [ GoodsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
