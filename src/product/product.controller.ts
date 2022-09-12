import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    postProduct(@Body() productDto: ProductDto) {
        return this.productService.createProduct(productDto)
    }


    @Get()
    getProducts() {
        return this.productService.getAllProduct()
    }
}
