export interface ICategory {
    id: number;
    name: string;
    image: string;
}

export interface ICreateCategory {
    name: string;
    image: File;
    description: string;
}