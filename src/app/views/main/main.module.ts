import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbAccordionModule, NgbCarouselModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from "./main.component";
import { SharedModule } from "../../shared/shared.module";

import { MainCarouselComponent } from './components/main-carousel/main-carousel.component';
import { MainFaqComponent } from './components/main-faq/main-faq.component';
import { MainModalComponent } from './components/main-modal/main-modal.component';


@NgModule({
  declarations: [
    MainComponent,
    MainCarouselComponent,
    MainFaqComponent,
    MainModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbCarouselModule,
    NgbAccordionModule,
    NgbModalModule,
    MainRoutingModule,
  ],
  exports: [
    MainRoutingModule
  ]
})
export class MainModule { }
