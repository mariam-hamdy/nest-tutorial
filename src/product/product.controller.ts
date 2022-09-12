import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
    getProducts() {
        return this.productService.getAllProducts()
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.productService.getOneProduct(id)
    }

    @Patch(':id') 
    updateOne(@Param('id') id: number, @Body() productUpdateDto: ProductUpdateDto) {
        return this.productService.updateOneProduct(id, productUpdateDto)
    }


    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.productService.deleteOneProduct(id)
    }

}


