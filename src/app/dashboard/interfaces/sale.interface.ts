export interface Sales {
  client:   string;
  products: ProductToSale[];
  payments: Payment[];
}

export interface ProductToSale {
  productId: string;
  quantity:  number;
}

export interface Payment {
  amount?: number;
}

