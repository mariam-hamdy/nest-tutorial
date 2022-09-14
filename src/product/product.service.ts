import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'dns';
import { CategoryDTO } from 'src/category/dto/category.dto';
import { CategoryEntity } from 'src/database/entity/category.entity';
import { ProductEntity } from 'src/database/entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { IProduct } from './dto/product.model';
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

    
}
