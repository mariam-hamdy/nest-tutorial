import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entity/category.entity';
import { Repository } from 'typeorm';
import { CategoryDTO } from './dto/category.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryEntity) 
        private categoryRepo: Repository<CategoryEntity>) {}


    async createCategory(categoryDto: CategoryDTO) {

        const category = await this.categoryRepo.save(categoryDto)

        return {category}
    }

    async getAllCategories() {

        const categories = await this.categoryRepo.find({
            relations: ['products']
        })

        return {categories, count: categories.length}
    }

    async getOneCategory(id:number) {
        const category = await this.categoryRepo.findOne({
            where: {id:id},
            relations: ['products']
        })
        if(!category) {
            throw new HttpException('category not found or the id invalid', HttpStatus.NOT_FOUND)
        }

        return {category}
    }

    async updateOneCategory(id: number, updateCategoryDto: UpdateCategoryDTO) {
        const category = await this.categoryRepo.findOne({
            where: {id:id}
        })
        if(!category) {
            throw new HttpException('the category not found or the id invalid', 
                HttpStatus.NOT_FOUND)
        }

        const success = await this.categoryRepo.update(id, updateCategoryDto)

        const updatedCategory = await this.categoryRepo.findOneOrFail({
            where: {id:id}
        })

        return {updatedCategory}
    }

    async deleteOneCategory(id: number) {

        const category = await this.categoryRepo.delete(id)
        return{category}
    }

}
