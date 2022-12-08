import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product as ProductModel, ProductDocument } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductInfo, ResourceId } from '@md/data';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createProduct(
    productInfo: ProductInfo,
    restaurantId: string
  ): Promise<ResourceId> {
    const restaurant = await this.userModel.findOne({ id: restaurantId });

    if (!restaurant) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const product = new this.productModel({
      id: productInfo.id,
      name: productInfo.name,
      allergies: productInfo.allergies,
      containsAlcohol: productInfo.containsAlcohol,
    });
    await product.save();
    return product.id;
  }

  async getAll(): Promise<ProductInfo[]> {
    return this.productModel.find({}, { _id: 0, __v: 0 });
  }

  async getOne(productId: string): Promise<Product> {
    const products = await this.productModel.aggregate([
      {
        $match: {
          id: productId,
        },
      },
    ]);

    return products[0];
  }

  async updateProduct(
    productId: string,
    productInfo: ProductInfo,
    restaurantId: string
  ): Promise<string> {
    const product = await this.productModel.findOne({ id: productId });
    const restaurant = await this.userModel.findOne({ id: restaurantId });
    if (!restaurant) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (restaurant.name == productInfo.name) {
      throw new HttpException(
        'You are not the owner of this product.',
        HttpStatus.BAD_REQUEST
      );
    }

    if (product) {
      try {
        await this.productModel.updateOne({ id: productId }, [
          {
            $set: {
              id: productId,
              name: productInfo.name,
              allergies: productInfo.allergies,
              containsAlcohol: productInfo.containsAlcohol,
            },
          },
        ]);
      } catch (e) {
        let errorMessage = 'Failed to do something exceptional';
        if (e instanceof Error) {
          errorMessage = e.message;
        }
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Product does not exist', HttpStatus.BAD_REQUEST);
    }

    return 'Updated: ' + productId;
  }

  async deleteOne(productId: string) {
    const product = await this.getOne(productId);
    if (product) {
      await this.productModel.deleteOne({ id: productId });
    } else {
      throw new HttpException('Product does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
