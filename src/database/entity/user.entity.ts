import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string

    @Column()
    passwordHash: string

    @Column({default: ''})
    phone: string

    @Column({default: ''})
    address: string

    @Column({default: false})
    isAdmin: boolean;
}