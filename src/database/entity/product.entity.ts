import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";


@Entity({name: 'product'})
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: ''})
    description: string;

    @Column()
    price: number;

    @Column({default: ''})
    brand: string;

    @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.products,
    {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn()
    category: CategoryEntity;

    @Column({default: 0})
    count: number;

    @Column({default: false})
    isFeatured: boolean;

    @Column({default: 0})
    rating: number;

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    
}