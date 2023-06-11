import {Component, OnInit} from '@angular/core';
import {SlideInterface} from "../imageSlider/types/slide.interface";

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss']
})
export class CharacterSelectionComponent implements OnInit{
  slides:SlideInterface[] = [
    {url:'/assets/character/1.png', title:'Bob'},
    {url:'/assets/character/2.png', title:'Bob'},
    {url:'/assets/character/3.png', title:'Bob'},
    {url:'/assets/character/4.png', title:'Bob'},
    {url:'/assets/character/5.png', title:'Bob'},
    {url:'/assets/character/6.png', title:'Bob'}
  ];

  username = ""

  formData = {
    name: undefined,
    avatar: undefined
  };

  ngOnInit() {
    const cookies = document.cookie;
    const cookieObj = {
      username: undefined,
      avatar_id: undefined
    };
    cookies.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cookieObj[name] = decodeURIComponent(value);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.username = cookieObj.username;
  }

  play(){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.formData.avatar = document.getElementById("charakter").value
    document.cookie = `username=` + this.formData.name;
    document.cookie = `avatar_id=` + this.formData.avatar;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location = "http://localhost/game-selection";
  }
}
