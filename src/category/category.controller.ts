import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';

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

    @Get(':id')
    getCategory(@Param('id',ParseIntPipe) id:number) {
        return this.categoryService.getOneCategory(id)
    }

    @Patch(':id')
    updateCategory(@Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDTO) {
            return this.categoryService.updateOneCategory(id, updateCategoryDto)
    }

    @Delete('delete/:id')
    deleteCategory(@Param('id', ParseIntPipe) id:number) {

        return this.categoryService.deleteOneCategory(id)
    }
}
