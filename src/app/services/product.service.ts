import { Injectable } from '@angular/core';
import {ProductType} from "../types/product.type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductType[] = [];
  private isLoaded: boolean = false;

  constructor(private http: HttpClient) { }

  public getProducts(callback: (products: ProductType[]) => void): void {
    if (this.isLoaded) {
      callback(this.products);
    } else {
      this.http.get<ProductType[]>('https://testologia.ru/tea')
        .subscribe((data: ProductType[]): void => {
          this.products = data;
          this.isLoaded = true;
          callback(this.products);
        });
    }
  }
}
