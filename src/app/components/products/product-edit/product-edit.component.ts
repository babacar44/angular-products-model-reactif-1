import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../../services/products.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventDriverService} from '../../../services/event-driver.service';
import {ProductActionsTypes} from '../../../state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId?: number;
  productFromGroup?: FormGroup;
  private submitted = false;
  constructor(private productService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private eventDriven: EventDriverService) {
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(product => {
      this.productFromGroup = this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        selected: [product.selected, Validators.required],
        available: [product.available, Validators.required],
      });
    });
  }

  onUpdateProduct() {
    this.productService.updateProduct(this.productFromGroup?.value).subscribe(
      data => {
        this.eventDriven.publishEvent({type: ProductActionsTypes.PRODUCT_UPDATED});
        alert('Success Product updated');
      }
    );
  }
}
