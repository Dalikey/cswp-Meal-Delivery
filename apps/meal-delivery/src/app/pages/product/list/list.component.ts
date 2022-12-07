import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  products$!: Observable<Product[] | null | undefined>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }
}
