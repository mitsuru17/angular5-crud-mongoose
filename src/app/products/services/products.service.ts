import { throwError as observableThrowError, Observable, Subject, BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product';

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

    getAll(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.url);
    }

    add(product: ProductModel): Observable<ProductModel> {
        return this.http.post<ProductModel>(this.url, product, { headers: <any>this.headers });
    }

    update(product: ProductModel) {
        return this.http.put<ProductModel>(this.url, product, { headers: <any>this.headers });
    }

    delete(id: number) {
        return this.http.delete<ProductModel>(`${this.url}/${id}`, { headers: <any>this.headers });
    }
}
