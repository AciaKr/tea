import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: ProductType | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id: number = Number(params['id']);
      if(id) {
        this.loadProduct(id);
      }
    })
  }

  private loadProduct(id: number): void {
    this.productService.getProducts((products: ProductType[]): void => {
      this.product = products.find((p: ProductType): boolean => p.id === id);
    });
  }
}
