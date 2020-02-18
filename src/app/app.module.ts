import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { DisplayComponent } from './components/display/display.component';
import { DisplayHistoryComponent } from './components/display-history/display-history.component';
import { DisplayTempComponent } from './components/display-temp/display-temp.component';
import { KeypadComponent } from './components/keypad/keypad.component';
import { KeyComponent } from './components/key/key.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CalculatorComponent,
    DisplayComponent,
    DisplayHistoryComponent,
    DisplayTempComponent,
    KeypadComponent,
    KeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
