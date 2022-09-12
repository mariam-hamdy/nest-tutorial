import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) 
        private ProductRepository: Repository<ProductEntity>) {}


    async createProduct(productDto: ProductDto) {
        const product = await this.ProductRepository.save(productDto)
        return {success: true, product}
    }

    async getAllProduct() {
        const products = await this.ProductRepository.find()
        const count = products.length
        return {products, count}
    }
}
