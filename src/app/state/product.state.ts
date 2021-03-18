export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}
export interface AppDataState<T> { // interface generique
  dataState?: DataStateEnum;
  data?: T;
  errorMessage?: string;
}
