import {Component, Input} from '@angular/core';
import {FaqType} from "../../../../types/faq.type";


@Component({
  selector: 'main-faq',
  templateUrl: './main-faq.component.html',
  styleUrls: ['./main-faq.component.scss']
})
export class MainFaqComponent {
  @Input() panels: FaqType[] = [];

  constructor() {  }
}

