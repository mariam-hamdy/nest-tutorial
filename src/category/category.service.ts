import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entity/category.entity';
import { Repository } from 'typeorm';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryEntity) 
        private categoryRepo: Repository<CategoryEntity>) {}


    async createCategory(categoryDto: CategoryDTO) {

        const category = await this.categoryRepo.save(categoryDto)

        return {category}
    }

    async getAllCategories() {

        const categories = await this.categoryRepo.find()

        return {categories, count: categories.length}
    }

}
