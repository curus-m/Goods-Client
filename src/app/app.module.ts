import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ErogeComponent } from './eroge/eroge.component';
import { ErogeService } from './eroge/eroge.service';
import { MakuraComponent } from './makura/makura.component';
import { TapestryComponent } from './tapestry/tapestry.component';
import { HeaderComponent } from './header/header.component';
import { TabulatorTableComponent } from './tabulator-table/tabulator-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ErogeComponent,
    MakuraComponent,
    TapestryComponent,
    HeaderComponent,
    TabulatorTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ ErogeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
