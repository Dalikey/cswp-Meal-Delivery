import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  products: Product[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }

  ngOnDestroy(): void {}

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }
}
