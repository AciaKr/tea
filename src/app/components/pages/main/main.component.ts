import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil, timer} from "rxjs";
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('promoPopup') popupElement!: ElementRef;
  private popupInstance?: Modal;
  private observable$: Subject<void> = new Subject<void>();

  constructor() {  }

  ngOnInit(): void {
    const shown: string | null = sessionStorage.getItem('popupShown');

    if (!shown) {
      timer(10000)
        .pipe(takeUntil(this.observable$))
        .subscribe((): void => {
          this.showPopup();
          sessionStorage.setItem('popupShown', 'true');
        });
    }
  }

  showPopup(): void {
    if (this.popupElement) {
      this.popupInstance = new Modal(this.popupElement.nativeElement);
      this.popupInstance.show();
    }
  }

  ngOnDestroy(): void {
    this.observable$.next();
    this.observable$.complete();
    this.popupInstance?.hide();
  }
}
