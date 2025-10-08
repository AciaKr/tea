import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public products: ProductType[] = []
  public loaderShow: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loaderShow = true;
    this.productService.getProducts((data: ProductType[]): void => {
      this.products = data;
      this.loaderShow = false;
    });
  }
}
