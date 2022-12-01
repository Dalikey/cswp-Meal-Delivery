import {Injectable} from '@angular/core';
import {Product} from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [
    {
      id: '12345-123-11',
      name: 'Banaan',
      allergies: [],
      containsAlcohol: false,
    },
    {
      id: '12345-123-12',
      name: 'Brood',
      allergies: ["gluten"],
      containsAlcohol: false,
    },
    {
      id: '12345-123-13',
      name: 'Panini',
      allergies: ["gluten"],
      containsAlcohol: false,
    },
    {
      id: '12345-123-14',
      name: 'Shake',
      allergies: [],
      containsAlcohol: false,
    },
    {
      id: '12345-123-15',
      name: 'Coffee',
      allergies: [],
      containsAlcohol: false,
    },
    {
      id: '12345-123-16',
      name: 'Snoep',
      allergies: [],
      containsAlcohol: false,
    },
    {
      id: '12345-123-17',
      name: 'Bier',
      allergies: ["gluten"],
      containsAlcohol: true,
    },
    {
      id: '12345-123-18',
      name: 'Kroket',
      allergies: ['Gerst', 'gluten', 'mais', 'peulvruchten', 'soja', 'tarwe', 'wortel'],
      containsAlcohol: false,
    },
  ];

  constructor() {
    console.log('ProductService created');
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product {
    return this.products.filter((product: Product) => product.id === id)[0];
  }

  addProduct(newProduct: Product): void {
    this.products.push(newProduct);
  }

  updateProduct(updatedProduct: Product) {
    console.log('Updating product ' + updatedProduct.name);
    let updatedProducts = this.products.filter((product) => product.id !== updatedProduct.id);
    updatedProducts.push(updatedProduct);
    this.products = updatedProducts;
  }

  deleteProduct(id: string) {
    let product = this.products.find((product) => product.id == id);
    let index = this.products.indexOf(product!);
    this.products.splice(index, 1);
  }
}
