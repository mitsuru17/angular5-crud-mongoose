import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ProductModel, ProductInterface } from '../models/product';
import { ProductsService } from '../services/products.service';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-products-modal-edit',
  templateUrl: './products-modal-edit.component.html',
  styleUrls: ['./products-modal-edit.component.css']
})
export class ProductsModalEditComponent implements OnInit {
  modalForm: FormGroup;
  title: string;

  product: ProductModel[] = [];
  selectedProduct: ProductModel = { _id: null, description: null, price: null, __v: null };

  constructor(private productService: ProductsService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.modalForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      price: new FormControl('', [
        Validators.pattern('\\d{1,}\\.?\\d{1,2}'),
        Validators.min(0),
        Validators.required
      ]),
      id: new FormControl()
    });
  }

  save() {
    this.selectedProduct._id = this.modalForm.controls.id.value;
    this.selectedProduct.description = this.modalForm.controls.description.value;
    this.selectedProduct.price = this.modalForm.controls.price.value;

    this.productService.update(this.selectedProduct).subscribe(

      (product: ProductModel) => {
        this.bsModalRef.hide();
        this.bsModalRef = null;
        console.log("Product updated", this.selectedProduct);
      },
      err => {
        console.log('Error updating (check node server) ', err);
      }
    );
  }

}
