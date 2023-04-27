import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RandToBitcoinComponent } from './components/rand-to-bitcoin/rand-to-bitcoin.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    RandToBitcoinComponent,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
