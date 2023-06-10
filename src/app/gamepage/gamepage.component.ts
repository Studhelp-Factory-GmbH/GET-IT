import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.scss']
})

export class GamepageComponent implements OnInit {

  zoomedPictureSrc!: string;
  zoomedPicture!: HTMLElement;
  zoomLevel = 35;
  zoomIncrement = 0.15;
  roomCode = "";

  constructor(private http : HttpClient, private route:ActivatedRoute)
  {
  }

  async ngOnInit() {
    // @ts-ignore
    this.zoomedPicture = document.getElementById("zoomed-picture");
    this.startZoomOutInterval();
    this.checkGuess();
    this.getRandomPicture()

    this.roomCode = this.route.snapshot.params['roomcode'];

    // test um die Spieler zu laden, das muss noch gemacht werden, ist noch buggy!
    const player_count = await this.getPlayer("http://localhost:3307/getPlayer").then(function (result) {
      const resultArr = JSON.parse(JSON.stringify(result))
      if (resultArr["success"]) {
        console.log(resultArr);
        //return resultArr['chat']
      }
      console.log(resultArr);
    });

  }


  // ---
  // Buttons:

  // API-Abfragen:
  getChatID(roomcode:number) {
    this.http.get(`http://localhost:3307/spiel/${roomcode}`)
    .subscribe(
      (response) => {   // --> [{"spielname":"Zoom-Spiel"}]
        console.log('Answer: ', response);
        return response;
      },
      (error) => {
        console.error('Failed: ', error);
      }
    );
  }

  createMessage(data:string) {
    this.http.post('http://localhost:3307/spieler', data)
  }

  // ---


  getRandomPicture() {
    const pictureList = [
      "garry_1.png",
      "patrick_1.png",
      "sandy_1.png",
      "spongebob_1.png",
      "spongebob_2.png"
    ];
    const randomIndex = Math.floor(Math.random() * pictureList.length);
    this.zoomedPictureSrc = 'assets/guessing-pictures/' + pictureList[randomIndex];
  }

  checkGuess() {
    const submitButton = document.getElementById("submit-button");

    // @ts-ignore
    submitButton.addEventListener("click", () => {
      const guessInput = document.getElementById("guess-input") as HTMLInputElement;

      const guess = guessInput.value.trim().toLowerCase();
      const pictureFilename = this.zoomedPicture.querySelector("img")?.getAttribute("src");
      const pictureName = pictureFilename ? pictureFilename.substring(pictureFilename.lastIndexOf("/") + 1, pictureFilename.lastIndexOf(".")).toLowerCase() : '';
      const final_pictureName = pictureName.slice(0, -2);

      //console.log(final_pictureName);
      //console.log(guess)

      // --> API-Call: Saving the messages!
      const raumcode = this.route.snapshot.params['roomcode'];
      console.log(raumcode);
      this.getChatID(raumcode);

      if (guess === final_pictureName) {
        alert("Richtig!");
      } else {
        alert("Falsch!");
      }
    });
  }

  startZoomOutInterval() {
    const zoomOutInterval = setInterval(() => {
      if (this.zoomLevel <= 1) {
        clearInterval(zoomOutInterval);
      } else {
        this.zoomLevel -= this.zoomIncrement;
        this.updateZoomedPictureTransform();
      }
    }, 100);
  }

  updateZoomedPictureTransform() {
    this.zoomedPicture.style.transform = `scale(${this.zoomLevel})`;
  }

  shareOnWhatsapp() {
    const raumcode = this.getRaumcode();
    const text = `Komm und Spiele mit mir eine Runde GET-IT! Raumcode: ${raumcode}`;
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappShareUrl, '_blank');
  }

  shareOnInstagram() {
    const raumcode = this.getRaumcode();
    const text = `Komm und Spiele mit mir eine Runde GET-IT! Raumcode: ${raumcode}`;
    this.copyTextToClipboard(text);
    alert("Einladung in Zwischenablage kopiert! :)");
  }

  shareOnTwitter() {
    const raumcode = this.getRaumcode();
    const text = "Komm und Spiele mit mir eine Runde GET-IT! Raumcode:";
    const twitterShareUrl = `https://twitter.com/share?url=${raumcode}&text=${text}`;
    window.open(twitterShareUrl, '_blank');
  }

  shareOnDiscord() {
    const raumcode = this.getRaumcode();
    const text = `Komm und Spiele mit mir eine Runde GET-IT! Raumcode: ${raumcode}`;
    this.copyTextToClipboard(text);
    alert("Einladung in Zwischenablage kopiert! :)");
  }

  async getPlayer(url: string) {
    const playerPayload = {raumcode: this.roomCode }
    return this.http.post(url.toString(), playerPayload).toPromise()
  }

  getRaumcode() {
    return this.roomCode;
  }

  copyTextToClipboard(text: string) {
    const textAreaElement = document.createElement("textarea");
    textAreaElement.value = text;
    document.body.append(textAreaElement);
    textAreaElement.select();
    document.execCommand("copy");
    document.body.removeChild(textAreaElement);
  }

}
