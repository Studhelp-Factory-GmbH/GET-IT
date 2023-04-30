import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgOptimizedImage} from "@angular/common";
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import {ImageSliderModule} from "./imageSlider/imageSlider.module";

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    ImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
