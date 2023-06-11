import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss'],
})
export class GameSelectionComponent implements OnInit {

  // Attribute:
  protected readonly Component = Component;
  spielname : any;
  raumcode : number | undefined;
  chatobject : any | undefined
  spielername : any

  // Konstruktor:
  constructor(
    private http : HttpClient,
    private router: Router) {}

  // Methode:
  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() : void {

/*    // Urls:
    const apiUrlSpieler = 'http://localhost:3307/spieler'

    // Url als String:
    const queryString = window.location.search;

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

    // Setzen der Cookies: --> Erfasst Userdaten!
    document.cookie = `username=${username};`;
    document.cookie = `avatar_id=${picture_id};`;

    this.spielername = username;

    // Speichern eines Spielers:
    this.http.post(apiUrlSpieler, items)
    .subscribe(
      () => {
        console.log('Spieler wurde erfolgreich hiunzugefügt!');
      },
      (error) => {
        console.error('Fehler beim Hinzufügen des Spielers:', error);
      }
    )*/
  }

  // Button funktionalitäten:
  async handleClick() {   // Zoomspiel-Button

    // Konstanten:
    const spiel_id = 1; // --> 1 steht für Zoom-Spiel!
    const apiUrlSpiel = `http://localhost:3307/spiel/${spiel_id}`;

    // Generieren einer 4-Stelligen Zufallszahl als Raumcode:
    this.raumcode = this.generateFourDigitRandomNumber();


    const chat = await this.erstelleChat(`http://localhost:3307/createChat`).then(function (result) {
      const resultArr = JSON.parse(JSON.stringify(result))
      if (resultArr["success"]) {
        return resultArr['chat']
      }
    });

    console.log("raum erstellen")
    // Erstellen eines Raumes:
    const room = await this.createRoom(`http://localhost:3307/createRoom`, chat, spiel_id).then(function (result) {
      console.log(JSON.parse(JSON.stringify(result)));
      return JSON.parse(JSON.stringify(result))
    });

   /* const id = 0;

    // Füge Spieler zum Raum hinzu
    const add_result = await this.addPlayerToRoom('http://localhost:3307/insertPlayerIntoRoom', id).then(function(result){
      return JSON.parse(JSON.stringify(result))
    });
    console.log(add_result)*/

    await this.router.navigate(['/app-gamepage', this.raumcode])
  }

  // HttpClient-Abfragen:
  getSpielnameFromAPI(url:string) {
    this.http.get(url.toString())
    .subscribe(
      (response) => {   // --> [{"spielname":"Zoom-Spiel"}]
        const js_array = JSON.parse(JSON.stringify(response))
        console.log(js_array[0]['spielname'])
        console.log('Antwort: ', response);
        this.spielname = js_array[0]['spielname']
      },
      (error) => {
        console.error('Fehler: ', error);
      }
    );
  }



  async createRoom(url: string,chat: number, spiel: number){
    const raumPayload = {raumcode: this.raumcode, chat_id: chat, spiel_id:spiel }
    return this.http.post(url.toString(), raumPayload).toPromise()
  }

  /**
    * @deprecated The method should not be used
  */
  async getPlayerIdFromName(url: string, spielername: string) {
    const playerIdPayload = {spielername: spielername}
    return this.http.post(url.toString(), playerIdPayload).toPromise()
  }

  async addPlayerToRoom(url: string, spieler_id: number) {
    const playerPayload = {raumcode: this.raumcode, spieler_id: spieler_id}
    return this.http.post(url.toString(), playerPayload).toPromise()
  }

  async erstelleChat(url: string  ) {
    const chatPayload = {raumcode: this.raumcode }
    return this.http.post(url.toString(), chatPayload).toPromise()
  }

  // Hilfsfunktionen:
  generateFourDigitRandomNumber(): number {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
