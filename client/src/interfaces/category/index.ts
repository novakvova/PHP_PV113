import {IPaginationData} from "../types.ts";
export interface ICategoryResponse extends IPaginationData {
    data: ICategory[];
}

export interface ICategory {
    id: number;
    name: string;
    // description: string;
    image: string;
}

export interface ICreateCategory {
    name: string;
    image: File;
    description: string;
}

export interface IEditCategory {
    name: string;
    image?: File;
}

interface IBase {
    id: number;
    created_at: string;
    updatedAt: string;
}

export interface ICategory extends IBase {
    name: string;
    image: string;
    description: string;
}