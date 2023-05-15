import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameSelectionComponent} from "./game-selection/game-selection.component";
import {GamepageComponent} from "./gamepage/gamepage.component";


const routes: Routes = [
  { path: 'app-gamepage', component: GamepageComponent },
  { path: 'game-selection', component: GameSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
