import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/entity/product.entity';
import { CategoryEntity } from 'src/database/entity/category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            CategoryEntity
        ])
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {}
