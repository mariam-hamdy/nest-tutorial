import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column({default: ''})
    category: string;

    @Column({default: 0})
    count: number;

    @Column({default: false})
    isFeatured: boolean;

    @Column({default: 0})
    rating: number;

    
}