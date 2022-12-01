import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  products: Product[] | undefined;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
    console.log(this.products.length + ' products found.');
  }

  ngOnDestroy(): void {
    console.log('ListComponent.ngOnDestroy');
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }
}
