import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('category')

export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: ''})
    color: string;

    @OneToMany( () => ProductEntity, (productEntity) => productEntity.category,
    {cascade: true})
    products: ProductEntity[]
}