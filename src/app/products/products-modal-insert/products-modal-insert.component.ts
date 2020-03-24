import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ProductModel } from '../models/product';
import { ProductsService } from '../services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-modal-insert',
  templateUrl: './products-modal-insert.component.html',
  styleUrls: ['./products-modal-insert.component.css']
})
export class ProductsModalInsertComponent implements OnInit {
  modalForm: FormGroup;
  title: string;
  product: ProductModel;
  constructor(private productService: ProductsService,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.modalForm = new FormGroup({
      description: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ]),
      price: new FormControl('', [
        Validators.pattern('\\d{1,}\\.?\\d{1,2}'),
        Validators.min(0),
        Validators.required
      ])
    });
  }

  onClickSave() {
    this.productService.add(this.modalForm.value).subscribe(
      (product: ProductModel) => {
        this.bsModalRef.hide();
        this.bsModalRef = null;
        console.log("Product created, ", product);
      },
      err => {
        console.log('Error insert (check node server) ', err);
      }
    );
  }

}
