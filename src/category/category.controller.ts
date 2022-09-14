import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @Post()
    create(@Body() categoryDto: CategoryDTO) {
        return this.categoryService.createCategory(categoryDto)
    }

    @Get()
    getAll() {
        return this.categoryService.getAllCategories()
    }
}
