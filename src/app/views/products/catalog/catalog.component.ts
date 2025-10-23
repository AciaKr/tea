import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public products: ProductType[] = []
  public loaderShow: boolean = false;
  // private searchQuery: string = '';
  // private destroy$: Subject<void> = new Subject<void>();

  constructor(private productService: ProductService) {}

  // ngOnInit(): void {
  //   this.productService.search$
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((query: string): void => {
  //       this.searchQuery = query;
  //       this.loadProducts(query);
  //     });
  // }
  //
  // loadProducts(query?: string): void {
  //   this.productService.getProducts(query)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(data => {
  //       this.products = data;
  //     });
  // }
  //
  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

  ngOnInit(): void {
    this.loaderShow = true;
    this.productService.getProducts((data: ProductType[]): void => {
      this.products = data;
      this.loaderShow = false;
    });
  }
}
