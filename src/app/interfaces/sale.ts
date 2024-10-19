import { cart } from "./cart";

export namespace Sale{

    export interface IdCart{
        id?:number;
        date: string;
        idCart: number;
    }

    export interface WithCart{
        id:number;
        date: string;
        cart: cart.WithProduct;
    }

}   