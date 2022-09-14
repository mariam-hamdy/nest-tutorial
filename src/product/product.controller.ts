import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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

    @Get()
    getProduct() {
        return this.productService.getAllProducts()
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id:number) {
        return this.productService.getOneProduct(id)
    }

    @Patch(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto:ProductUpdateDto) {
        
        return this.productService.updateOneProduct(id, updateProductDto)
    }

   

}


