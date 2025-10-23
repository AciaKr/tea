import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompressTextPipe} from "./pipes/compress-text.pipe";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CompressTextPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CompressTextPipe
  ]
})
export class SharedModule { }
