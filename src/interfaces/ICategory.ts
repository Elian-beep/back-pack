import IItem from "./IItem";

export interface ICategory {
    id?: number,
    name: string,
    items?: IItem[]
}