import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {User} from '../user/user.model';
import {Product} from './product.model';
import {ProductService} from './product.service';

// Global mock objects
const expectedProducts: Product[] = [
  {
    id: '12345-123-11',
    name: 'Banaan',
    allergies: [],
    containsAlcohol: false,
  },
];

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient}],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of products', (done: DoneFn) => {
    const products = service.getAllProducts();
    expect(products.length).toBe(8);
    expect(products[0].id).toEqual(expectedProducts[0].id);
    done();
  });

  it('should return Bier', (done: DoneFn) => {
    const product = service.getProductById('12345-123-17');
    expect(product.name).toEqual('Bier');
    done();
  });

  it('should add a product', (done: DoneFn) => {
    const newProduct = {
      id: '12345-123-20',
      name: 'Aardbei',
      allergies: [],
      containsAlcohol: false,
    };
    service.addProduct(newProduct);
    expect(service.getAllProducts().length).toEqual(9);
    done();
  });

  it('should update a product', (done: DoneFn) => {
    const newProduct = {
      id: '12345-123-11',
      name: 'Banaan',
      allergies: [],
      containsAlcohol: false,
    };
    service.updateProduct(newProduct);
    expect(service.getProductById('12345-123-12').name).toEqual(
      'Brood'
    );
    expect(service.getProductById('12345-123-12').name).not.toEqual(
      'Pasta Bolognese met tomaat, spekjes en kaas'
    );
    done();
  });

  it('should delete a product', (done: DoneFn) => {
    service.deleteProduct('12345-123-18');
    expect(service.getProductById('12345-123-18')).toBeUndefined();
    done();
  });
});
