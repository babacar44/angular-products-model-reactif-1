import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../services/products.service';
import {EventDriverService} from '../../../services/event-driver.service';
import {ProductActionsTypes} from '../../../state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productformGroup?: FormGroup | null = null;
  submitted = false;
  constructor(private fb: FormBuilder, private productService: ProductsService,
              private eventDriven: EventDriverService) { }

  ngOnInit(): void {
    this.productformGroup = this.fb.group({
        name: ['', Validators.required],
        price: [0, Validators.required],
        quantity: [0, Validators.required],
        selected: [true, Validators.required],
        available: [true, Validators.required]
    });
  }

  onSaveProduct() {
    this.submitted = true;
    if (this.productformGroup.invalid) { return; }
    this.productService.save(this.productformGroup.value).subscribe(data => {
      this.eventDriven.publishEvent({type: ProductActionsTypes.PRODUCT_ADDED});
      alert('Success');
    });
  }
}
