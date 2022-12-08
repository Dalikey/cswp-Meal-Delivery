import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  products$!: Observable<Product[] | null | undefined>;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products$ = this.productService.getAllProducts();
    });
  }
}
