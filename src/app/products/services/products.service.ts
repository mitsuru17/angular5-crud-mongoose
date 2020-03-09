import { throwError as observableThrowError, Observable, Subject, BehaviorSubject } from 'rxjs';

import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ProductModel, ProductInterface } from '../models/product';

@Injectable()
export class ProductsService {
    private url = 'http://localhost:3000/api/products/';

    // private list = new Subject<Product[]>();
    // list$ = this.list.asObservable();

    // private loadingList = new BehaviorSubject<boolean>(false);
    // loadingList$ = this.loadingList.asObservable();

    // private inserted = new BehaviorSubject<boolean>(false);
    // inserted$ = this.inserted.asObservable();

    // private updated = new BehaviorSubject<boolean>(false);
    // updated$ = this.updated.asObservable();

    // private deleted = new BehaviorSubject<boolean>(false);
    // deleted$ = this.deleted.asObservable();

    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) { }

    // getAll(): Observable<ProductModel[]> {
    //     return this.http.get<any>(this.url);
    // }

    getAll(): Observable<ProductModel[]> {
        return this.http.get(`${this.url}`)
            .pipe(
                map((response) => Object.keys(response).map(key => {
                    const product = { id: key, ...response[key] } as ProductInterface;
                    return new ProductModel(product);
                }))
            );
    }

    // add(product: Product) {
    //     return this.http.post(this.url, product, { headers: <any>this.headers });
    // }

    // update(product: Product) {
    //     return this.http.put(this.url, product, { headers: <any>this.headers });
    //     // .pipe(map((res: Response) => this.updated.next(true)));
    // }

    // update(product: Product) {
    //     return this.http.put(this.url, product, { headers: <any>this.headers });
    //   }

    // delete(product: Product) {
    //     return this.http.delete(`${this.url}/${product._id}`, { headers: <any>this.headers });
    // }
}
