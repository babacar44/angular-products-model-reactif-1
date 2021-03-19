import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from '../../../state/product.state';
import {Product} from '../../../model/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSelect(p: Product) {
    this.productsEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCTS, payload: p});
  }

  // tslint:disable-next-line:typedef
  onDelete(p: Product) {
    this.productsEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCTS, payload: p});
  }

  // tslint:disable-next-line:typedef
  onEdit(p: Product) {
    this.productsEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCTS, payload: p});
  }

  onActionEvent($event: ActionEvent) {
    this.productsEventEmitter.emit($event);
  }
}
