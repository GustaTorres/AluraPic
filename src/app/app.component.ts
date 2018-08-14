import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'alurapic';

  photos = [
    {
      url: "https://mcn-images.bauersecure.com/PageFiles/488045/Triumph675StreetTriple.jpg",
      description: "street triple"
    },
    {
      url: "https://www.thehindu.com/life-and-style/motoring/article18351587.ece/alternates/FREE_660/03bgmtriumph4jpg",
      description: "Tiger 800"
    }
  ]
}
