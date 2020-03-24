import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ProductModel } from '../models/product';

@Component({
  selector: 'app-products-modal-view',
  templateUrl: './products-modal-view.component.html',
  styleUrls: ['./products-modal-view.component.css']
})
export class ProductsModalViewComponent implements OnInit {

  title: string;
  product: ProductModel[] = [];
  constructor(
    public bsModalRef: BsModalRef
    ) {}

  ngOnInit() {
  }

}
