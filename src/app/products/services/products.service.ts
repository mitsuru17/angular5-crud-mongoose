import { throwError as observableThrowError, Observable, Subject, BehaviorSubject } from 'rxjs';

import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable()
export class ProductsService {
    private url = 'http://localhost:3000/api/products/';

    private list = new Subject<Product[]>();
    list$ = this.list.asObservable();

    private loadingList = new BehaviorSubject<boolean>(false);
    loadingList$ = this.loadingList.asObservable();

    private inserted = new BehaviorSubject<boolean>(false);
    inserted$ = this.inserted.asObservable();

    private updated = new BehaviorSubject<boolean>(false);
    updated$ = this.updated.asObservable();

    private deleted = new BehaviorSubject<boolean>(false);
    deleted$ = this.deleted.asObservable();

    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) { }


    getAll() {
        this.loadingList.next(true);
        this.http.get(this.url).pipe(
            map((res: any) => this.list.next(res)))
            .finally(() => this.loadingList.next(false))
            .catch((error: any) => {
                this.list.error(new Error(error || 'Server error'));
                return observableThrowError(error.json().error || 'Server error');
            }).subscribe();
    }

    // getAll(): Observable<any> {
    //     this.loadingList.next(true);
    //     return this.http.get<any>(`${this.url}`);
    // }

    add(product: Product): Observable<void> {
        return this.http.post(this.url, product, { headers: <any>this.headers }).pipe(
            map((res: Response) => this.inserted.next(true)));
    }

    update(product: Product): Observable<void> {
        return this.http.put(this.url, product, { headers: <any>this.headers }).pipe(
            map((res: Response) => this.updated.next(true)));
    }

    delete(product: Product): Observable<void> {
        return this.http.delete(`${this.url}/${product._id}`, { headers: <any>this.headers }).pipe(
            map((res: Response) => this.deleted.next(true)));
    }
}
