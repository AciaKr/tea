import {Component} from '@angular/core';
import {FaqType} from "../../types/faq.type";
import {FAQ_DATA} from "../../data/faq.data";
import {CAROUSEL_IMAGES} from "../../data/carousel.data";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  images: string[] = CAROUSEL_IMAGES;
  panels: FaqType[] = FAQ_DATA;
}
