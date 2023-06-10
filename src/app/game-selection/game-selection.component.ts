import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss'],
})
export class GameSelectionComponent implements OnInit {
  
  // Attribute:
  protected readonly Component = Component;
  spielname : any;
  raumcode : Number | undefined;

  // Konstruktor:
  constructor(private http : HttpClient) {} 

  // Methode:
  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() : void {

    // Urls:
    const apiUrlSpieler = 'http://localhost:3307/spieler'

    // Url als String:
    const queryString = window.location.search;
    console.log(queryString);

    // Url-Parameter filtern:
    const urlParams = new URLSearchParams(queryString);
    let username = urlParams.get('username');
    const picture_id = urlParams.get('character')?.substring(23, 24);

    // Filtern ungültiger Namen:
    const names = [
      "Hans",
      "Peter",
      "Jürgen",
      "Ferdinand",
      "Franz"
    ];

    const min = 1;
    const max = 5;
    
    if(username === "") {
      username = names[Math.floor(Math.random() * (max - min + 1) + min)]
    }

    // Hinzufügen eines Spielers:
    const items = {
      spielername: username,
      avatar_id: picture_id
    };

    // Zu speicherne Werte:
    console.log(username);
    console.log(picture_id);

    // Speichern eines Spielers:
    this.http.post(apiUrlSpieler, items)
      .subscribe(
        () => {
          console.log('Datensatz wurde erfolgreich hiunzugefügt!');
        },
        (error) => {
          console.error('Fehler beim Hinzufügen des Datensatzes:', error);
        }
      )
  }

  // Button funktionalitäten:
  handleClick() {   // Zoomspiel-Button

    // Urls:
    const apiUrlChat = 'http://localhost:3307/chat';

    // Konstanten:
    const spiel_id = 1; // --> 1 steht für Zoom-Spiel!
    const apiUrlSpiel = `http://localhost:3307/spiel/${spiel_id}`;

    // Generieren einer 4-Stelligen Zufallszahl als Raumcode:
    this.raumcode = this.generateFourDigitRandomNumber();
    console.log("Raumcode: ", this.raumcode);

    // Abfragen des Spielnames:
    this.getSpielnameFromAPI(apiUrlSpiel)  
    
    // Chat erstellen:
    const chat_body = {
      raumcode: this.raumcode
    };
    this.erstelleChat(apiUrlChat, chat_body);

    // Erstellen eines Raumes:


  }

  // HttpClient-Abfragen:
  getSpielnameFromAPI(url:String) {
    this.http.get(url.toString())
    .subscribe(
      (response) => {   // --> [{"spielname":"Zoom-Spiel"}]
        let js_array = JSON.parse(JSON.stringify(response))
        console.log(js_array[0]['spielname'])
        console.log('Antwort: ', response);
        this.spielname = js_array[0]['spielname']
      },
      (error) => {
        console.error('Fehler: ', error);
      }
    );
  }

  erstelleChat(url:String, raumcode:Number) {
    this.http.post(url.toString(), raumcode)
    .subscribe(
      () => {
        console.log('Chat wurde erstellt!');
      },
      (error) => {
        console.error('Fehler beim erstellen des Chats:', error);
      }
    );
  }

  erstelleRaum(url:String) {
    
  }

  // Hilfsfunktionen:
  generateFourDigitRandomNumber(): number {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
