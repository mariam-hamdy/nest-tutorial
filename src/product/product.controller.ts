import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryDTO } from 'src/category/dto/category.dto';
import { ProductDto } from './dto/product.dto';
import { ProductUpdateDto } from './dto/productUpdate.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    postProduct(@Body() productDto: ProductDto) {
        return this.productService.createProduct(productDto)
    }


   

}


