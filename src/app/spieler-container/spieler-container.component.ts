import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-spieler-container',
  templateUrl: './spieler-container.component.html',
  styleUrls: ['./spieler-container.component.scss']
})
export class SpielerContainerComponent {
  // Attribute:
  username : string | undefined = "";
  avatar_id : string | undefined = "";

  imageUrls: string[] = [
    `${this.avatar_id}` ,
  ];
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
    this.username = cookieObj.username;
    this.avatar_id = cookieObj.avatar_id;
    this.imageUrls = [ `${this.avatar_id}`]
  }
   
}
