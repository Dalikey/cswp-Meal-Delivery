import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ConfigModule } from '../../shared/moduleconfig/config.module';
import { Product } from './product.model';
import { ProductService } from './product.service';

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
      imports: [
        HttpClientModule,
        ConfigModule.forRoot({ apiEndpoint: environment.SERVER_API_URL }),
      ],
      providers: [{ provide: HttpClient }],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of products', (done: DoneFn) => {
    const products = service.getAllProducts();
    done();
  });

  it('should return Bier', (done: DoneFn) => {
    const product = service.getProductById('12345-123-17');
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
    done();
  });

  it('should delete a product', (done: DoneFn) => {
    service.deleteProduct('12345-123-18');
    done();
  });
});
