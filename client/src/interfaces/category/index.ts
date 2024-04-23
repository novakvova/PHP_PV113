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