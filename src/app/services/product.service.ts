import { Injectable } from '@angular/core';
import {ProductType} from "../types/product.type";
import {HttpClient} from "@angular/common/http";
import {OrderType} from "../types/order.type";
import {Observable} from "rxjs";

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

  public createOrder(data: OrderType): Observable<{ success: number }> {
    return this.http.post<any>('https://testologia.ru/order-tea', data);
  }
}
