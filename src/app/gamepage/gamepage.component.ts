import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {SseService} from "../sse.service";
import {using} from "rxjs";


@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.scss']
})

export class GamepageComponent implements OnInit {

  chatID: void | number = 0;
  formData = {
    guess: undefined
  };
  submitMessage() {
    this.createMessage()
  }

  createMessage(){
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

    const url = 'http://localhost:3000/fact';
    const data = {
      message:this.formData.guess,
      username: cookieObj.username
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(url, data, { headers })
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.getElementById("guess-input").value = ""
  }


  zoomedPictureSrc!: string;
  zoomedPicture!: HTMLElement;
  zoomLevel = 35;
  zoomIncrement = 0.15;
  roomCode = "";

  constructor(private http : HttpClient, private route:ActivatedRoute, private sseService: SseService)
  {
  }

  async ngOnInit() {
    this.sseService
      .getServerSentEvent("http://localhost:3000/events")
      .subscribe(data => {
        if (Array.isArray(JSON.parse(data.data))){
          JSON.parse(data.data).forEach((message: { message: string; username: string}) =>{
            const para = document.createElement("p");
            console.log(message)
            if (this.checkGuess(message.message)){
              para.style.color = "#00FF00"
            }
            else {
              para.style.color = "#FFFFFF"
            }
            const node = document.createTextNode( message.username + ' : ' + message.message);
            para.appendChild(node);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.getElementById("chatMessages").append(para);
          });
        }
        else {
          const para = document.createElement("p");
          const message = JSON.parse(data.data).message;
          const username = (JSON.parse(data.data)).username;
          if (this.checkGuess(message)){
            para.style.color = "#00FF00"
          }
          else {
            para.style.color = "#FFFFFF"
          }
          const node = document.createTextNode(username + ' : ' + message);
          para.appendChild(node);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          document.getElementById("chatMessages").append(para);
        }
      });

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
    this.zoomedPicture = document.getElementById("zoomed-picture");
    this.startZoomOutInterval();
    this.getRandomPicture();
    this.chatID = await this.getChatID(Number(this.getRoomcode())).then(function (result) {
      const resultArr = JSON.parse(JSON.stringify(result))
      return resultArr[0]['id']
    });
    this.roomCode = this.route.snapshot.params['roomcode'];
    // test um die Spieler zu laden, das muss noch gemacht werden, ist noch buggy!
    const player_count = await this.getPlayer("http://localhost:3307/getPlayer").then(function (result) {
      const resultArr = JSON.parse(JSON.stringify(result))
      if (resultArr["success"]) {
        console.log(resultArr);
        return resultArr['players']
      }
    });

  }

  // ---
  // Buttons:

  // API-Abfragen:
  async getChatID(roomcode:number) {
    return this.http.get(`http://localhost:3307/chat/${roomcode}`).toPromise()
  }

  async getImageInRoom(){
    const data = {
      raumcode :this.getRoomcode(),
    };
    return this.http.post(`http://localhost:3307/getimageIntoRoom`, data).toPromise()
  }

  getRoomcode() {
    const parts = document.location.toString().split('/');
    return parts.at(-1);
  }
  async getRandomPicture() {

    const image = await this.getImageInRoom().then(function (result) {
      const resultArr = JSON.parse(JSON.stringify(result));
      return resultArr.image
    });
    if (image === null){
      const pictureList = [
        "garry_1.png",
        "patrick_1.png",
        "sandy_1.png",
        "spongebob_1.png",
        "spongebob_2.png"
      ];
      const randomIndex = Math.floor(Math.random() * pictureList.length);
      const imageUrl = 'assets/guessing-pictures/' + pictureList[randomIndex];
      console.log(imageUrl)
      const data = {
        raumcode :this.getRoomcode(),
        image: imageUrl
      };
      this.http.post(`http://localhost:3307/imageIntoRoom`, data).toPromise()

      this.zoomedPictureSrc = imageUrl
    }
    else {
      console.log(image)
      this.zoomedPictureSrc = image;
    }

  }
  checkGuess(guessInput: string) {
    // @ts-ignore
    const guess = guessInput.trim().toLowerCase();
    const pictureFilename = this.zoomedPicture.querySelector("img")?.getAttribute("src");
    const pictureName = pictureFilename ? pictureFilename.substring(pictureFilename.lastIndexOf("/") + 1, pictureFilename.lastIndexOf(".")).toLowerCase() : '';
    const final_pictureName = pictureName.slice(0, -2);
    return guess === final_pictureName;
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
