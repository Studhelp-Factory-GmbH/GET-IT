import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss'],
})
export class GameSelectionComponent implements OnInit {
  
  protected readonly Component = Component;
  
  // Implementierung des HttpClients für die DB:
  private apiUrlSpieler = 'http://localhost:3307/spieler';

  constructor(private http : HttpClient) {} 

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() : void {
    // Url als String:
    const queryString = window.location.search;
    console.log(queryString);

    // Url-Parameter filtern:
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    console.log(username);
    const picture_id = urlParams.get('character')?.substring(23, 24);
    console.log(picture_id);

    // Hinzufügen eines Spielers:
    const items = {
      spielername: username,
      avatar_id: picture_id
    };

    this.http.post(this.apiUrlSpieler, items)
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
    // Generieren einer 4-Stelligen Zufallszahl als Raumcode:
    const raumcode = this.generateFourDigitRandomNumber();
    const spiel_id = 1;
    const apiUrlSpiel = `http://localhost:3307/spiel/${spiel_id}`
    console.log(apiUrlSpiel)
    this.http.get(apiUrlSpiel)
    .subscribe(
      (response) => {
        console.log('Antwort: ', response);
      },
      (error) => {
        console.error('Fehler: ', error);
      }
    );

  }

  // Hilfsfunktionen:
  generateFourDigitRandomNumber(): number {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
