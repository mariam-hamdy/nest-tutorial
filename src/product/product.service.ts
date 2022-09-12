import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'dns';
import { ProductEntity } from 'src/database/entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductUpdateDto } from './dto/productUpdate.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) 
        private ProductRepository: Repository<ProductEntity>) {}


    async createProduct(productDto: ProductDto) {
        const product = await this.ProductRepository.save(productDto)
        return {success: true, product}
    }

    async getAllProducts() {
        const products = await this.ProductRepository.find()
        const count = products.length
        return {products, count}
    }

    async getOneProduct(id: number) {
        const product = await this.ProductRepository.findOne({
            where: {id: id}
        })
        if(!product) {
            throw new HttpException(NOTFOUND, HttpStatus.NOT_FOUND)
        }
        return {success: true, product}
    }


    async updateOneProduct(id: number,  productUpdateDto: ProductUpdateDto) {
        const product = await this.ProductRepository.update(id, productUpdateDto)

        if(!product) {
            throw new HttpException(NOTFOUND, HttpStatus.NOT_FOUND)
        }

        const updatedProduct = await this.ProductRepository.findOneOrFail({
            where: {
                id: id
            }
        })

        return {success: true, updatedProduct}
    }

    async deleteOneProduct(id: number) {
        const product = await this.ProductRepository.delete(id)

        if(!product) {
            throw new HttpException(NOTFOUND, HttpStatus.NOT_FOUND)
        }

        return {success: true, product}
    }
}
