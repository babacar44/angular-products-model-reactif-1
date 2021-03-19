import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from '../../state/product.state';
import {Router} from '@angular/router';
import {$e} from 'codelyzer/angular/styles/chars';
import {EventDriverService} from '../../services/event-driver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private  productsService: ProductsService,
              private router: Router,
              private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable$.subscribe((actionEvent: ActionEvent) => {
        this.onActionEvent(actionEvent);
    });
  }
  // tslint:disable-next-line:typedef
  ongetAllProducts() {
    /*this.productsService.getAllProducts().subscribe(
      data => {
        this.products = data;
      },error =>
    );*/
    // @ts-ignore
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) /* reçoit data*/ => {
        console.log('data =====', data);
        return ({dataState: DataStateEnum.LOADED, data})
      }),
      startWith({dataState: DataStateEnum.LOADING}), // retourne klk chose avant l envoi de la requete
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  ongetSelectedProducts() {
    // @ts-ignore
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map((data) /* reçoit data*/ => {
        console.log('data =====', data);
        return ({dataState: DataStateEnum.LOADED, data})
      }),
      startWith({dataState: DataStateEnum.LOADING}), // retourne klk chose avant l envoi de la requete
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  ongetAvailableProducts() {
    // @ts-ignore
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map((data) /* reçoit data*/ => {
        console.log('data =====', data);
        return ({dataState: DataStateEnum.LOADED, data})
      }),
      startWith({dataState: DataStateEnum.LOADING}), // retourne klk chose avant l envoi de la requete
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSearch(dataForm: any) {
    // @ts-ignore
     this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map((data) /* reçoit data*/ => {
        console.log('data =====', data);
        return ({dataState: DataStateEnum.LOADED, data});
      }),
      startWith({dataState: DataStateEnum.LOADING}), // retourne klk chose avant l envoi de la requete
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p).subscribe(
      data => {
        p.selected = data.selected;
      }
    );
  }

  onDelete(p: Product) {
    const v = confirm('Voulez-vous vraiment supprimer ?');
    if(v === true) {
    this.productsService.deleteProduct(p).subscribe(
      data => {
        this.ongetAllProducts();
      }
    );
    }
  }

  onNewProduct() {
    // @ts-ignore
    this.router.navigateByUrl('/newProduct');
  }

  onEdit(p: Product) {
    this.router.navigateByUrl('/editProduct/' + p.id);
  }

  // tslint:disable-next-line:typedef
  onActionEvent($event: ActionEvent) {
    console.log($event);
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.ongetAllProducts(); break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.ongetSelectedProducts(); break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.ongetAvailableProducts(); break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload); break;
      case ProductActionsTypes.NEW_PRODUCTS: this.onNewProduct(); break;
      case ProductActionsTypes.DELETE_PRODUCTS: this.onDelete($event.payload); break;
      case ProductActionsTypes.SELECT_PRODUCTS: this.onSelect($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCTS: this.onEdit($event.payload); break;
    }
  }
}
