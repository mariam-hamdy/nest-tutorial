import { ICategory } from "src/category/dto/category.model";

export interface IProduct {
    name: string;
    description?: string;
    price: number;
    brand: string;
    category: ICategory
    count: number;
    isFeatured?: boolean;
    rating?: number;
}