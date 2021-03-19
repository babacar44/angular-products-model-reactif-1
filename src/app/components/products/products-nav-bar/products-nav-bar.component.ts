import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from '../../../state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  ongetAllProducts() {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS, payload: null});
  }

  ongetSelectedProducts() {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCTS, payload: null});
  }

  ongetAvailableProducts() {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS, payload: null});

  }

  onNewProduct() {
    this.productEventEmitter.emit({type: ProductActionsTypes.NEW_PRODUCTS, payload: null});

  }

  onSearch(dataForm: any) {
    this.productEventEmitter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: dataForm});
  }
}
