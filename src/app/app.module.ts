import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgOptimizedImage} from "@angular/common";
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import {ImageSliderModule} from "./imageSlider/imageSlider.module";
import { GamepageComponent } from './gamepage/gamepage.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectionComponent,
    GamepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: "", component: CharacterSelectionComponent},
      {path: "app-gamepage", component: AppComponent}
    ]),
    NgOptimizedImage,
    ImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
