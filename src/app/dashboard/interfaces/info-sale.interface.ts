export interface SaleInfo {
  _id:         string;
  client:      Client;
  products:    Product[];
  totalAmount: number;
  saleDate:    Date;
  __v:         number;
  payments:    Payment[];
}

export interface Client {
  _id:  string;
  name: string;
}

export interface Payment {
  amount: number;
  date:   Date;
  paymentType: string;
  _id:    string;
}

export interface Product {
  productId: ProductID;
  quantity:  number;
  price:     number;
  _id:       string;
}

export interface ProductID {
  _id:      string;
  name:     string;
  brand:    string;
  size:     string;
  imageUrl: string;
}

