import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgOptimizedImage} from "@angular/common";
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import {ImageSliderModule} from "./imageSlider/imageSlider.module";
import { GamepageComponent } from './gamepage/gamepage.component';
import { GameSelectionComponent } from './game-selection/game-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectionComponent,
    GamepageComponent,
    GameSelectionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: "", component: CharacterSelectionComponent},
      {path: "app-gamepage/:roomcode", component: AppComponent},
      {path: "game-selection", component: GameSelectionComponent}
    ]),
    NgOptimizedImage,
    ImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
