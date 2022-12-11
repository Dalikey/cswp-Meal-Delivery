import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductInfo, Product, ResourceId } from '@md/data';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @InjectToken() token: Token,
    @Body() product: ProductInfo
  ): Promise<ResourceId> {
    try {
      return await this.productService.createProduct(product, token.id);
    } catch (e) {
      let errorMessage = 'Failed to do something exceptional';
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAll(): Promise<ProductInfo[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getOne(id);
  }

  @Put(':id')
  async updateProduct(
    @InjectToken() token: Token,
    @Param('id') productId: string,
    @Body() product: ProductInfo
  ): Promise<ProductInfo> {
    try {
      return this.productService.updateProduct(productId, product, token.id);
    } catch (e) {
      let errorMessage = 'Failed to do something exceptional';
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteOne(id);
  }
}
