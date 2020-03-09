import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ProductModel, ProductInterface } from '../models/product';

@Component({
  selector: 'app-products-modal-view',
  templateUrl: './products-modal-view.component.html',
  styleUrls: ['./products-modal-view.component.css']
})
export class ProductsModalViewComponent implements OnInit {

  title: string;
  product: ProductInterface[];
  constructor(
    public bsModalRef: BsModalRef
    ) {}

  ngOnInit() {
  }

}
