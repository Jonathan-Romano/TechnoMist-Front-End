import { Product } from "./product";
export namespace cart{

    export interface only{
        product: Product;
        cant: number;
    }

    export interface WithCode{
        id?: number;
        codProducts: string[];
        precioTotal?:number;
    }

    export interface WithProduct{
        id?: number;
        productos: Product[];
        precioTotal?:number;
    }

}