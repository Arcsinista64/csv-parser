import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxCsvParserModule } from 'ngx-csv-parser'
import { FormsModule } from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import { TablasComponent } from './components/tablas/tablas.component';

@NgModule({
  declarations: [
    AppComponent,
    TablasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCsvParserModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
