import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public _product: ProductType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this._product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params): void => {
      const id: number = Number(params['id']);
      if(id) {
        this.loadProduct(id);
      }
    })
  }

  private loadProduct(id: number): void {
    this.productService.getProducts((products: ProductType[]): void => {
      const product: ProductType | undefined = products.find((p: ProductType): boolean => p.id === id);
      product && (this._product = product);
    });
  }

  public addToCart(titleProduct: string): void {
    if (titleProduct) {
      this.router.navigate(['/order'], { queryParams: { product: titleProduct } });
    }
  }
}
