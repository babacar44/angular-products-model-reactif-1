import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {ActionEvent, ProductActionsTypes} from '../../../../state/product.state';
import {EventDriverService} from '../../../../services/event-driver.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
   @Input() product: Product | null = null;
  // @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  constructor(private eventDriven: EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(p: Product) {
   // this.eventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCTS, payload: p});
    this.eventDriven.publishEvent({type: ProductActionsTypes.SELECT_PRODUCTS, payload: p});
  }

  onDelete(product: Product) {
   // this.eventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCTS, payload: product});
    this.eventDriven.publishEvent({type: ProductActionsTypes.DELETE_PRODUCTS, payload: product});
  }

  onEdit(product: Product) {
  //  this.eventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCTS, payload: product});
    this.eventDriven.publishEvent({type: ProductActionsTypes.EDIT_PRODUCTS, payload: product});
  }
}
