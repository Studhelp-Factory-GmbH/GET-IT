import { Component } from '@angular/core';
import {SlideInterface} from "../imageSlider/types/slide.interface";

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss']
})
export class CharacterSelectionComponent {
  slides:SlideInterface[] = [
    {url:'/assets/character/1.png', title:'Bob'},
    {url:'/assets/character/2.png', title:'Bob'},
    {url:'/assets/character/3.png', title:'Bob'},
    {url:'/assets/character/4.png', title:'Bob'},
    {url:'/assets/character/5.png', title:'Bob'},
    {url:'/assets/character/6.png', title:'Bob'}
  ];
}
