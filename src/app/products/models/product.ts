// export class Product {
//     public _id: string;
//     public description: string;
//     public price: number;
//     public __v: number;
// }

export interface ProductInterface {
    _id: string;
    description: string;
    price: number;
    __v: number;
}

export class ProductModel {
    _id: string;
    description: string;
    price: number;
    __v: number;

    constructor(data: ProductInterface) {
        this._id = data._id || null;
        this.description = data.description || null;
        this.price = data.price || null;
    }
}
