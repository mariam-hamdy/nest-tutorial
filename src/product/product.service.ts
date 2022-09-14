import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entity/category.entity';
import { ProductEntity } from 'src/database/entity/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductUpdateDto } from './dto/productUpdate.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) 
        private ProductRepository: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>) {}


    async createProduct(productDto: ProductDto) {

        //category must be created first before the product
       const categoryId = productDto.category
       
       const category = await this.categoryRepo.findOne({
        where: {id:categoryId}
       })

       if(!category) {
        throw new HttpException('category not found', HttpStatus.NOT_FOUND)
       }
       const product = await this.ProductRepository.save({
        name: productDto.name,
        description: productDto.description,
        price: productDto.price,
        brand: productDto.brand,
        category: category,
        count: productDto.count,
        isFeatured: productDto.isFeatured,
        rating: productDto.rating
       })

       return {product}
    
       
    }

    async getAllProducts() {
        const products = await this.ProductRepository.find({
            relations: ['category']
        })
        return {products, count: products.length}
    }

    async getOneProduct(id: number) {

        const product = await this.ProductRepository.findOne({
            where: {id:id},
            relations: ['category']
        })
        if(!product) {
            throw new HttpException('the product not found or the id invalid',
                HttpStatus.NOT_FOUND)
        }

        return {product }
    }

    async updateOneProduct(id: number, updateProductDto: ProductUpdateDto) {

        let productResult
        const categoryId = updateProductDto.category
        if(categoryId) {
            const category = await this.categoryRepo.findOne({
                where:{id:categoryId}
            })
            if(!category) {
                throw new HttpException('category not found', HttpStatus.NOT_FOUND)
            }
            productResult = await this.ProductRepository.update(id, {
                name: updateProductDto.name,
                description: updateProductDto.description,
                price: updateProductDto.price,
                brand: updateProductDto.brand,
                category: category,
                count: updateProductDto.count,
                isFeatured: updateProductDto.isFeatured,
                rating: updateProductDto.rating
            })
        } else {
            productResult = await this.ProductRepository.update(id, {
                name: updateProductDto.name,
                description: updateProductDto.description,
                price: updateProductDto.price,
                brand: updateProductDto.brand,
                count: updateProductDto.count,
                isFeatured: updateProductDto.isFeatured,
                rating: updateProductDto.rating
            })
        }

        
        if(!productResult) {
            throw new HttpException('nothing change', HttpStatus.BAD_REQUEST)
        }
        const updatedProduct = await this.ProductRepository.findOneOrFail({
            where: {id:id},
            relations: ['category']
        })

        return {updatedProduct}
            

    }

    
}
