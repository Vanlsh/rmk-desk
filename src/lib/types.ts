export interface Product {
  code: number;
  name: string;
  serial: string;
  barcode: string;
  globalCode: string;
  tax: number;
  price: number;
  isWeight: boolean;
  mrcPrice: number;
  amount: number;
  group: string;
  uktzed: string;
  unit: string;
}

export interface Group {
  code: number;
  name: string;
}
export interface ArticleSaveResponse {
  success: boolean;
  message: string;
  saved_articles: Product[];
  updated_articles: Product[];
}

export interface GroupSaveResponse {
  success: boolean;
  message: string;
  saved_groups: Group[];
  updated_groups: Group[];
}

export interface SuccessResponse<T> {
  success: true;
  error: false;
  data: T;
}

export interface ErrorResponse {
  error: true;
  success: false;
}
