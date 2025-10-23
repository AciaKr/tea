import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject, takeUntil, timer} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit, OnDestroy{
  @ViewChild('promoPopup') popupElement!: TemplateRef<ElementRef>;
  private observable$: Subject<void> = new Subject<void>();

  constructor(private modalService: NgbModal) {  }

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
      this.modalService.open(this.popupElement);
    }
  }

  ngOnDestroy(): void {
    this.observable$.next();
    this.observable$.complete();
    this.modalService.dismissAll(this.popupElement);
  }
}
