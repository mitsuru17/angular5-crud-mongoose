import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductModel } from '../models/product';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ProductsModalInsertComponent } from '../products-modal-insert/products-modal-insert.component';
import { ProductsModalViewComponent } from '../products-modal-view/products-modal-view.component';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
    public alerts: any = [];
    bsModalRef: BsModalRef;
    // productList: Product[];
    products: ProductModel[];
    loading: boolean;
    inserted: boolean;

    constructor(private productService: ProductsService,
        private modalService: BsModalService
    ) {

        // this.productService.list$.subscribe(
        //     data => {
        //         this.productList = data;
        //     },
        //     err => {
        //         console.log('Error getting list (check node server) ', err);
        //     });
        // this.productService.loadingList$.subscribe(
        //     response => this.loading = response
        // );
        // this.productService.inserted$.subscribe(
        //     response => {
        //         if (response === true) {
        //             this.alerts.push({
        //                 type: 'md-local',
        //                 msg: `Product added correctly`,
        //                 timeout: 6000
        //             });
        //             this.loadData();
        //         }
        //     }
        // );
        // this.productService.updated$.subscribe(
        //     response => {
        //         if (response === true) {
        //             this.alerts.push({
        //                 type: 'warning',
        //                 msg: `Product updated correctly`,
        //                 timeout: 6000
        //             });
        //             this.loadData();
        //         }
        //     }
        // );
        // this.productService.deleted$.subscribe(
        //     response => {
        //         if (response === true) {
        //             this.alerts.push({
        //                 type: 'danger',
        //                 msg: `Product deleted correctly`,
        //                 timeout: 6000
        //             });
        //             this.loadData();
        //         }
        //     }
        // );
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.productService.getAll()
            .subscribe(
                res => this.products = res,
                err => console.log(err),
            );
        console.log(this.products);
    }

    openModalInsert(event: Event): void {
        event.preventDefault();
        // this.bsModalRef = this.modalService.show(ProductsModalInsertComponent);
        // this.bsModalRef.content.title = `Insert Product`;
    }

    openModalView(product: ProductModel) {
        this.bsModalRef = this.modalService.show(ProductsModalViewComponent);
        this.bsModalRef.content.title = `Product ${product.description}`;
        this.bsModalRef.content.product = product;
    }

    openModalEdit(product: ProductModel) {
        // this.bsModalRef = this.modalService.show(ProductsModalEditComponent);
        // this.bsModalRef.content.title = `Edit Product ${product.description}`;
        // this.bsModalRef.content.product = product;
    }

    onClickDeleted(product: ProductModel): void {
        // this.productService.delete(product).subscribe(
        //     response => {
        //     },
        //     err => {
        //         console.log('Error delete (check node server) ', err);
        //     });
    }


}
