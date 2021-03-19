export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}
export enum ProductActionsTypes{
  GET_ALL_PRODUCTS = '[Product] GET All products',
  GET_SELECTED_PRODUCTS = '[Product] GET Selected products',
  GET_AVAILABLE_PRODUCTS = '[Product] GET Available products',
  SEARCH_PRODUCTS = '[Product] GET Search products',
  NEW_PRODUCTS = '[Product] New products',
  SELECT_PRODUCTS = '[Product] Select products',
  EDIT_PRODUCTS = '[Product] Edit products',
  DELETE_PRODUCTS = '[Product] Delete products',
}
export interface AppDataState<T> { // interface generique
  dataState?: DataStateEnum;
  data?: T;
  errorMessage?: string;
}

export interface ActionEvent {
  type: ProductActionsTypes;
  payload?: any;
}
