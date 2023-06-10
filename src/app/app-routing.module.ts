import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameSelectionComponent} from "./game-selection/game-selection.component";
import {GamepageComponent} from "./gamepage/gamepage.component";
import { CharacterSelectionComponent } from './character-selection/character-selection.component';

const routes: Routes = [
  { path: '', component: CharacterSelectionComponent},
<<<<<<< Updated upstream
  { path: `app-gamepage`, component: GamepageComponent },
=======
  { path: 'app-gamepage', component: GamepageComponent},
>>>>>>> Stashed changes
  { path: 'game-selection', component: GameSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
