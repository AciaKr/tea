import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {NgbCarousel, NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements AfterViewInit {
  @Input() images: string[] = [];
  @ViewChild('carousel') carouselElement!: NgbCarousel;

  constructor(private config: NgbCarouselConfig) {
    Object.assign(this.config, {
      showNavigationIndicators: false,
      interval: 2000,
      wrap: true,
      keyboard: true,
      pauseOnHover: true,
      animation: true,
    });
  }

  ngAfterViewInit(): void {
    setTimeout((): void => this.carouselElement.cycle());
  }
}

